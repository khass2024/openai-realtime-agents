// src/app/questionBank.ts
export interface Question {
    id: number;
    text: string;
    answer: string;
  }
  
  const questions: Question[] = [
    {
      id: 1,
      text: "Please help me solve: 2x + 3 = 7",
      answer: "x = 2",
    },
    {
      id: 2,
      text: "What is the value of x in 3x - 5 = 4?",
      answer: "x = 3",
    },
    {
      id: 3,
      text: "Solve for x: 4x + 2 = 10",
      answer: "x = 2",
    },
    {
      id: 4,
      text: "Find x: 5x - 10 = 0",
      answer: "x = 2",
    },
    {
      id: 5,
      text: "Determine x for: x/2 = 3",
      answer: "x = 6",
    },
  ];
  
  export default questions;
  