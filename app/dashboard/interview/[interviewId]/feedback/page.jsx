"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Emotion badge shown in feedback
const EmotionBadge = ({ emotionData }) => {
  if (!emotionData) return null;

  let parsed;
  try {
    parsed =
      typeof emotionData === "string" ? JSON.parse(emotionData) : emotionData;
  } catch {
    return null;
  }

  const { emoji, label, color, confidence } = parsed;
  if (!emoji) return null;

  const barColor =
    confidence >= 65 ? "#22c55e" : confidence >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div
      className="p-2 border rounded-lg text-sm"
      style={{ backgroundColor: color + "18", borderColor: color + "55" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="font-semibold flex items-center gap-2"
          style={{ color }}
        >
          <span className="text-base">{emoji}</span>
          Emotion: {label}
        </span>
        <span className="text-xs font-bold" style={{ color: barColor }}>
          {confidence}% Confidence
        </span>
      </div>
      {/* Confidence bar */}
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${confidence}%`, backgroundColor: barColor }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        You appeared <strong>{label.toLowerCase()}</strong> during this answer.
      </p>
    </div>
  );
};

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}/feedback`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const total = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0,
      );
      return (total / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  // Compute dominant emotion across all answers
  const overallEmotion = useMemo(() => {
    const emotions = feedbackList
      .map((item) => {
        try {
          return item.emotionData ? JSON.parse(item.emotionData) : null;
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    if (emotions.length === 0) return null;

    const avgConfidence = Math.round(
      emotions.reduce((sum, e) => sum + (e.confidence ?? 0), 0) /
        emotions.length,
    );

    // Pick the most common dominant emotion
    const counts = {};
    for (const e of emotions) {
      if (e.dominant) counts[e.dominant] = (counts[e.dominant] ?? 0) + 1;
    }
    const topEmotion = emotions.find(
      (e) =>
        e.dominant ===
        Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0],
    );

    return topEmotion ? { ...topEmotion, confidence: avgConfidence } : null;
  }, [feedbackList]);

  if (loading) {
    return <div className="p-10 text-gray-500">Loading your feedback...</div>;
  }

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500 my-5">
          No interview feedback record found.
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          {/* Overall stats row */}
          <div className="flex flex-wrap gap-4 my-4">
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-500">Overall Rating</span>
              <strong
                className={`text-lg ${overallRating >= 5 ? "text-green-500" : "text-red-600"}`}
              >
                {overallRating}
                <span className="text-black text-sm">/10</span>
              </strong>
            </div>

            {overallEmotion && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: overallEmotion.color + "22",
                  border: `1px solid ${overallEmotion.color}55`,
                }}
              >
                <span className="text-xl">{overallEmotion.emoji}</span>
                <div>
                  <p className="text-xs text-gray-500">Overall Confidence</p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: overallEmotion.color }}
                  >
                    {overallEmotion.label} · {overallEmotion.confidence}%
                  </p>
                </div>
              </div>
            )}
          </div>

          <h2 className="text-sm text-gray-500 mb-4">
            Find below each question with the correct answer, your answer,
            feedback, and emotion analysis.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                {item.question} <ChevronDown className="h-5 w-5 shrink-0" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating: </strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary-900">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                  <EmotionBadge emotionData={item.emotionData} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className="mt-6" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
