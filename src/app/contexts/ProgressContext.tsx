// src/app/contexts/ProgressContext.tsx
"use client";

import React, { createContext, useContext, useState, FC, PropsWithChildren } from "react";
import questions, { Question } from "../questionBank";

interface ProgressContextValue {
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  totalQuestions: number;
  incrementProgress: () => void;
  checkAnswer: (text: string) => boolean;
}

/**
 * Helper function to normalize text.
 * - Converts to lowercase
 * - Replaces "equals" with "="
 * - Normalizes whitespace
 */
const normalizeText = (str: string) => {
  return str
    .toLowerCase()
    .replace(/equals/g, "=")
    .replace(/\s+/g, " ")
    .trim();
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const totalQuestions = questions.length;

  const currentQuestion: Question | null =
    currentQuestionIndex < totalQuestions ? questions[currentQuestionIndex] : null;

  /**
   * Checks if the provided text contains the answer to the current question.
   * Normalizes both the text and answer to allow for minor differences (like "equals" vs. "=").
   */
  const checkAnswer = (text: string): boolean => {
    if (!currentQuestion) return false;
    const normalizedText = normalizeText(text);
    const normalizedAnswer = normalizeText(currentQuestion.answer);
    return normalizedText.includes(normalizedAnswer);
  };

  const incrementProgress = () => {
    setCurrentQuestionIndex((prev) =>
      prev + 1 < totalQuestions ? prev + 1 : prev
    );
  };

  return (
    <ProgressContext.Provider
      value={{
        currentQuestionIndex,
        currentQuestion,
        totalQuestions,
        incrementProgress,
        checkAnswer,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
