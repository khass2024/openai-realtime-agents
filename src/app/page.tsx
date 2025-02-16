// src/app/page.tsx
"use client";  // <-- Add this at the very top

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
        Progress: {currentQuestionIndex}/{totalQuestions}
      </h1>
    </div>
  );
}

export default function Page() {
  const [showImage, setShowImage] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // No need for successImages array since we're using the same image

  useEffect(() => {
    const handleProblemSolved = () => {
      if (currentStage < 5) {
        setShowImage(true);
        setCurrentStage(prev => {
          const newStage = prev + 1;
          if (newStage === 5) {
            setIsComplete(true);
          }
          return Math.min(newStage, 5);
        });
        setTimeout(() => setShowImage(false), 2000);
      }
    };

    window.addEventListener('problemSolved', handleProblemSolved);
    return () => window.removeEventListener('problemSolved', handleProblemSolved);
  }, [currentStage]);

  // Debug function to simulate problem solved
  const debugTriggerSolved = () => {
    window.dispatchEvent(new Event('problemSolved'));
  };

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
