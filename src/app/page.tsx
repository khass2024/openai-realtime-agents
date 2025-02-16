// src/app/page.tsx
"use client";

import React from "react";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";
import { ProgressProvider, useProgress } from "@/app/contexts/ProgressContext";
import App from "./App";

function ProgressDisplay() {
  const { currentQuestionIndex, totalQuestions } = useProgress();
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
      <h1 className="text-xl font-bold p-2 bg-white/80 rounded-lg shadow-sm">
        Progress: {currentQuestionIndex + 1}/{totalQuestions}
      </h1>
    </div>
  );
}

export default function Page() {
  return (
    <TranscriptProvider>
      <EventProvider>
        <ProgressProvider>
          <div className="flex flex-col h-screen relative">
            <ProgressDisplay />
            <App />
          </div>
        </ProgressProvider>
      </EventProvider>
    </TranscriptProvider>
  );
}
