"use client";

import React, { useState, useEffect } from "react";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";
import App from "./App";

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
        <div className="flex flex-col h-screen relative">
          {/* Debug button - only shown in development */}
          {process.env.NODE_ENV === 'development' && (
            <button 
              onClick={debugTriggerSolved}
              className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-30"
            >
              Debug: Trigger Success
            </button>
          )}
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
            <h1 className="text-xl font-bold p-2 bg-white/80 rounded-lg shadow-sm flex items-center gap-2">
              {isComplete ? (
                <span className="text-green-600 animate-pulse">Well Done! 🎉</span>
              ) : (
                <>
                  Progress: {currentStage}/5
                  <img 
                    src="/golden-star.png" 
                    alt="Golden Star" 
                    className="h-6 w-6 object-contain"
                  />
                </>
              )}
            </h1>
          </div>
          {/* Success animation with zoom effect */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 
            ${showImage ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <img 
              src="/golden-star.png" 
              alt="Success Star" 
              className="w-48 h-48 object-contain animate-zoom-in"
            />
          </div>
          {/* Fireworks animation when complete */}
          {isComplete && (
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute left-1/4 animate-firework-1" />
              <div className="absolute left-2/4 animate-firework-2" />
              <div className="absolute left-3/4 animate-firework-3" />
            </div>
          )}
          <App />
        </div>
      </EventProvider>
    </TranscriptProvider>
  );
}
