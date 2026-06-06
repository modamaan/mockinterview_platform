"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Emotion → confidence mapping
const EMOTION_CONFIG = {
  happy:     { label: "Confident",  emoji: "😊", color: "#22c55e", score: 90 },
  neutral:   { label: "Calm",       emoji: "😐", color: "#3b82f6", score: 70 },
  surprised: { label: "Uncertain",  emoji: "😮", color: "#f59e0b", score: 50 },
  fearful:   { label: "Nervous",    emoji: "😰", color: "#f97316", score: 30 },
  sad:       { label: "Low Energy", emoji: "😔", color: "#8b5cf6", score: 25 },
  disgusted: { label: "Stressed",   emoji: "😣", color: "#ef4444", score: 20 },
  angry:     { label: "Stressed",   emoji: "😠", color: "#ef4444", score: 20 },
};

const DEFAULT_STATE = {
  dominantEmotion: null,
  confidenceScore: 0,
  expressions: {},
  label: "",
  emoji: "",
  color: "#6b7280",
  isReady: false,
  faceDetected: true,
  error: null,
};

/**
 * Custom hook for real-time emotion detection using face-api.js.
 * @param {React.RefObject} videoRef  — ref attached to a <video> or <Webcam> element
 * @param {boolean}         enabled   — set false to pause detection
 * @param {number}          interval  — detection interval in ms (default 600)
 */
export function useEmotionDetection(videoRef, enabled = true, interval = 600) {
  const [state, setState] = useState(DEFAULT_STATE);
  const loopRef = useRef(null);
  const faceApiRef = useRef(null);
  const mountedRef = useRef(true);

  // Track emotions accumulated during recording for summary
  const historyRef = useRef([]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Load models once
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        // Dynamically import to avoid SSR issues
        const faceapi = await import("face-api.js");
        faceApiRef.current = faceapi;

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);

        if (!cancelled && mountedRef.current) {
          setState((prev) => ({ ...prev, isReady: true }));
        }
      } catch (err) {
        console.error("[useEmotionDetection] Failed to load models:", err);
        if (!cancelled && mountedRef.current) {
          setState((prev) => ({ ...prev, error: "Failed to load emotion models" }));
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // Detection loop
  useEffect(() => {
    if (!state.isReady || !enabled) {
      if (loopRef.current) clearInterval(loopRef.current);
      return;
    }

    loopRef.current = setInterval(async () => {
      const faceapi = faceApiRef.current;
      const video = videoRef.current?.video ?? videoRef.current;

      if (!video || video.readyState < 2) return;

      try {
        const result = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (!mountedRef.current) return;

        // No face detected
        if (!result) {
          setState((prev) => ({ ...prev, faceDetected: false }));
          return;
        }

        const expressions = result.expressions;
        // Find dominant expression
        const dominant = Object.entries(expressions).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );
        const [emotionKey] = dominant;
        const config = EMOTION_CONFIG[emotionKey] ?? EMOTION_CONFIG.neutral;

        const snapshot = { emotion: emotionKey, score: config.score, ts: Date.now() };
        historyRef.current.push(snapshot);

        setState({
          dominantEmotion: emotionKey,
          confidenceScore: config.score,
          expressions: Object.fromEntries(
            Object.entries(expressions).map(([k, v]) => [k, Math.round(v * 100)])
          ),
          label: config.label,
          emoji: config.emoji,
          color: config.color,
          isReady: true,
          faceDetected: true,
          error: null,
        });
      } catch {
        // Silently skip failed frames
      }
    }, interval);

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [state.isReady, enabled, videoRef, interval]);

  /**
   * Call this when recording ends to get a summary of emotions during the session.
   * Returns { dominant, confidence, breakdown }
   */
  const getEmotionSummary = useCallback(() => {
    const history = historyRef.current;
    if (history.length === 0) return null;

    // Tally emotion counts
    const counts = {};
    let totalScore = 0;
    for (const snap of history) {
      counts[snap.emotion] = (counts[snap.emotion] ?? 0) + 1;
      totalScore += snap.score;
    }

    const dominant = Object.entries(counts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    const avgConfidence = Math.round(totalScore / history.length);
    const config = EMOTION_CONFIG[dominant] ?? EMOTION_CONFIG.neutral;

    // Reset history for next answer
    historyRef.current = [];

    return {
      dominant,
      label: config.label,
      emoji: config.emoji,
      color: config.color,
      confidence: avgConfidence,
      breakdown: counts,
    };
  }, []);

  const resetHistory = useCallback(() => {
    historyRef.current = [];
  }, []);

  return { ...state, getEmotionSummary, resetHistory };
}
