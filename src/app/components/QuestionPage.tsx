"use client";
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";

// Define the Question type
interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

// Sample questions (normally this might come from a prop or API)
const questions: Question[] = [
  {
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1, // Index of "4"
  },
  {
    text: "What is the capital of France?",
    options: ["Florida", "Paris", "Texas", "London"],
    correctAnswer: 1, // Index of "Paris"
  },
];

const QuestionPage: React.FC = () => {
  // State for the test
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  ); // User answers (-1 = unanswered)
  const [submitted, setSubmitted] = useState(false); // Whether the test is submitted
  const [score, setScore] = useState(0); // Final score
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  // Timer logic (replaces separate Timer component)
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit when time runs out
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer); // Cleanup on unmount or re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Handle selecting an option (replaces QuestionComponent logic)
  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  // Navigation handlers
  const handleNext = () => {
    setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
  };

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  };

  // Submit the test and calculate score
  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setSubmitted(true);
  };

  // Calculate the score based on user answers
  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  // Check if all questions are answered
  const allAnswered = answers.every((answer) => answer !== -1);

  // Render the UI
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with Timer */}
      <Timer onTimeUp={() => {}} />

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-3xl mx-auto w-full">
        {!submitted ? (
          <div className="space-y-6">
            {/* Question Number */}
            <div className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>

            {/* Question and Options */}
            <QuestionCard
              question={questions[currentQuestion]}
              selectedOption={answers[currentQuestion]}
              onOptionSelect={handleOptionSelect}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-green-700 transition"
              >
                Submit Test
              </button>
            </div>
          </div>
        ) : (
          /* Score Display */
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Score
            </h2>
            <p className="text-5xl text-blue-600 font-semibold">
              {score} / {questions.length}
            </p>
            <p className="mt-4 text-gray-600">
              {score === questions.length
                ? "Perfect! Great job!"
                : "Good effort! Review your answers to improve."}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4 text-gray-600">
        © 2023 Online Test Platform
      </footer>
    </div>
  );
};

export default QuestionPage;
