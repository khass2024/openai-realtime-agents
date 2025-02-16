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
 * Mapping of digits to words.
 */
const digitMap: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
};

/**
 * Replaces digits in the string with their word equivalents.
 */
const convertDigitsToWords = (str: string): string => {
  return str.replace(/\d/g, (digit) => digitMap[digit] || digit);
};

/**
 * Normalizes the string:
 * - Converts to lowercase
 * - Replaces "equals" with "="
 * - Normalizes whitespace
 * - Also converts digits to words
 */
const normalizeText = (str: string): string => {
  return convertDigitsToWords(
    str
      .toLowerCase()
      .replace(/equals/g, "=")
      .replace(/\s+/g, " ")
      .trim()
  );
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const totalQuestions = questions.length;

  const currentQuestion: Question | null =
    currentQuestionIndex < totalQuestions ? questions[currentQuestionIndex] : null;

  /**
   * Checks if the provided text contains the answer to the current question.
   * This will normalize both text and answer and convert any digits to words so that
   * variations like "2", "two", or "equals" are handled.
   */
  const checkAnswer = (text: string): boolean => {
    if (!currentQuestion) return false;
    const normalizedText = normalizeText(text);
    const normalizedAnswer = normalizeText(currentQuestion.answer);
    console.log("Normalized transcript:", normalizedText);
    console.log("Normalized answer:", normalizedAnswer);
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
