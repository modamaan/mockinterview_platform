"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "@/app/dashboard/layout";
import { useEmotionDetection } from "@/components/useEmotionDetection";
import EmotionOverlay from "@/components/EmotionOverlay";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const webcamRef = useRef(null);

  // Emotion detection — runs on webcam video while webcam is enabled
  const {
    emoji,
    label,
    color,
    confidenceScore,
    isReady: emotionReady,
    faceDetected,
    getEmotionSummary,
    resetHistory,
  } = useEmotionDetection(webcamRef, webCamEnabled);

  // Reset answer when question changes
  useEffect(() => {
    setUserAnswer("");
    resetHistory();
  }, [activeQuestionIndex, resetHistory]);

  // Alert when face leaves the frame
  useEffect(() => {
    if (!webCamEnabled || !emotionReady) return;
    if (!faceDetected) {
      toast.warning("⚠️ Face not detected! Please look at the camera.", {
        id: "face-warning",
        duration: Infinity,
      });
    } else {
      toast.dismiss("face-warning");
    }
  }, [faceDetected, webCamEnabled, emotionReady]);

  const saveAnswer = useCallback(
    async (answer, emotionSummary) => {
      if (!answer || answer.trim().length <= 10) return;
      if (
        !interviewData?.mockId ||
        !mockInterviewQuestion?.[activeQuestionIndex]
      )
        return;

      try {
        setLoading(true);
        const res = await fetch(
          `/api/interviews/${interviewData.mockId}/answer`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: mockInterviewQuestion[activeQuestionIndex].Question,
              correctAns: mockInterviewQuestion[activeQuestionIndex].Answer,
              userAns: answer,
              emotionSummary: emotionSummary ?? null,
            }),
          },
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to save answer");
        }

        toast.success("Answer recorded successfully!");
        setUserAnswer("");
      } catch (err) {
        toast.error(
          err.message || "An error occurred while saving your answer.",
        );
      } finally {
        setLoading(false);
      }
    },
    [activeQuestionIndex, interviewData, mockInterviewQuestion],
  );

  const transcribeAudio = useCallback(
    async (audioBlob, emotionSummary) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");

        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Transcription failed");

        const { transcription } = await res.json();
        const updatedAnswer = (userAnswer + " " + transcription).trim();
        setUserAnswer(updatedAnswer);
        await saveAnswer(updatedAnswer, emotionSummary);
      } catch {
        toast.error("Error transcribing audio. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [userAnswer, saveAnswer],
  );

  const startRecording = async () => {
    try {
      resetHistory();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        // Capture emotion summary at the moment recording ends
        const emotionSummary = getEmotionSummary();
        await transcribeAudio(audioBlob, emotionSummary);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div
        className="flex flex-col justify-center items-center rounded-lg p-5 bg-black mt-4 w-[30rem]"
        style={{ position: "relative" }}
      >
        {webCamEnabled ? (
          <>
            <Webcam
              ref={webcamRef}
              mirrored={true}
              style={{ height: 250, width: "100%", zIndex: 10 }}
            />
            <EmotionOverlay
              emoji={emoji}
              label={label}
              color={color}
              confidenceScore={confidenceScore}
              isReady={emotionReady}
              isRecording={isRecording}
            />
            {/* Face-not-detected warning overlay */}
            {emotionReady && !faceDetected && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 8,
                  border: "3px solid #ef4444",
                  backgroundColor: "rgba(239,68,68,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 30,
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontSize: 32 }}>🚫</span>
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    marginTop: 8,
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                    fontFamily: "system-ui, sans-serif",
                    textAlign: "center",
                    padding: "0 12px",
                  }}
                >
                  Face not detected!
                  <br />
                  Please look at the camera
                </p>
              </div>
            )}
          </>
        ) : (
          <Image
            src="/camera.jpg"
            width={200}
            height={200}
            alt="Camera placeholder — enable webcam to see your video feed"
          />
        )}
      </div>

      {/* Emotion status banner — shown when webcam is on but not during active recording */}
      {webCamEnabled && emotionReady && !isRecording && emoji && (
        <div
          className="mt-3 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"
          style={{
            backgroundColor: color + "cc",
            transition: "background-color 0.4s",
          }}
        >
          <span>{emoji}</span>
          <span>Feeling {label}</span>
        </div>
      )}

      {!webCamEnabled && (
        <p className="text-xs text-gray-400 mt-2">
          Enable webcam for emotion detection during your interview
        </p>
      )}

      {userAnswer && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg w-[30rem] text-sm text-gray-700">
          <strong>Your answer:</strong> {userAnswer}
        </div>
      )}

      <div className="md:flex mt-4 md:mt-8 md:gap-5">
        <div className="my-4 md:my-0">
          <Button onClick={() => setWebCamEnabled((prev) => !prev)}>
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
        >
          {isRecording ? (
            <span className="text-red-400 flex gap-2 items-center">
              <Mic /> Stop Recording...
            </span>
          ) : loading ? (
            "Saving..."
          ) : (
            "Record Answer"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
