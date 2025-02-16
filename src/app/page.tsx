import React from "react";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";
import App from "./App";

export default function Page() {
  return (
    <TranscriptProvider>
      <EventProvider>
        <div className="flex flex-col h-screen relative">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
            <h1 className="text-xl font-bold p-2 bg-white/80 rounded-lg shadow-sm">
              Progress: {0}/5
            </h1>
          </div>
          <App />
        </div>
      </EventProvider>
    </TranscriptProvider>
  );
}
