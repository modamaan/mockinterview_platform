"use client";

import React from "react";

/**
 * EmotionOverlay — shows real-time emotion badge + confidence bar
 * Floats over the webcam container.
 *
 * Props:
 *  emoji         string   — e.g. "😊"
 *  label         string   — e.g. "Confident"
 *  color         string   — hex color for the badge
 *  confidenceScore number — 0-100
 *  isReady       boolean  — hide overlay until models are loaded
 *  isRecording   boolean  — only show full overlay during active recording
 */
const EmotionOverlay = ({
  emoji,
  label,
  color,
  confidenceScore,
  isReady,
  isRecording,
}) => {
  if (!isReady || !emoji) return null;

  const barColor =
    confidenceScore >= 65
      ? "#22c55e"
      : confidenceScore >= 40
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
        pointerEvents: "none",
      }}
    >
      {/* Emotion badge */}
      <div
        style={{
          backgroundColor: color + "cc",
          backdropFilter: "blur(6px)",
          border: `1.5px solid ${color}`,
          borderRadius: 12,
          padding: "4px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.4s ease",
        }}
      >
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            fontFamily: "system-ui, sans-serif",
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          {label}
        </span>
      </div>

      {/* Confidence bar — only shown during recording */}
      {isRecording && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 8,
            padding: "4px 8px",
            minWidth: 110,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <span style={{ color: "#ccc", fontSize: 10, fontFamily: "system-ui" }}>
              Confidence
            </span>
            <span
              style={{
                color: barColor,
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "system-ui",
              }}
            >
              {confidenceScore}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${confidenceScore}%`,
                backgroundColor: barColor,
                borderRadius: 4,
                transition: "width 0.4s ease, background-color 0.4s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionOverlay;
