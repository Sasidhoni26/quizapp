"use client"

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  questions: Question[];
  duration?: number; 
  title?: string;
  onComplete?: (score: number, answers: Record<number, string>) => void;
}

export default function TNPSCQuiz({
  questions = [],
  duration = 1800, 
  title = "TNPSC Exam Practice",
  onComplete
}: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset states when questions change
  useEffect(() => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(duration);
  }, [questions, duration]);

  // Timer effect
  useEffect(() => {
    if (showResults || questions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, questions]);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleNext = () => {
    if (selected && questions.length > 0) {
      const updatedAnswers = { ...answers, [currentQ]: selected };
      setAnswers(updatedAnswers);
      
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(updatedAnswers[currentQ + 1] || null);
      }
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[currentQ - 1] || null);
    }
  };

  const handleSubmit = () => {
    if (questions.length === 0) return;

    // Save current answer if exists
    const finalAnswers = selected 
      ? { ...answers, [currentQ]: selected } 
      : answers;
    
    // Calculate score
    const correctAnswers = questions.reduce((count, q, index) => {
      return finalAnswers[index] === q.answer ? count + 1 : count;
    }, 0);

    setAnswers(finalAnswers);
    setScore(correctAnswers);
    setShowResults(true);

    // Notify parent component
    if (onComplete) {
      onComplete(correctAnswers, finalAnswers);
    }
  };

  // Ad banner component
  const AdBanner = () => (
    <div className="mt-4 bg-gray-100 border border-gray-200 rounded-lg p-2 text-center">
      <div className="text-xs text-gray-500 mb-1">ADVERTISEMENT</div>
      <div className="h-[90px] w-full flex items-center justify-center bg-gray-200 rounded">
        {/* Replace with actual ad code */}
        <span className="text-gray-500">Ad Banner</span>
      </div>
    </div>
  );

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-xl text-gray-600">No questions available</div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Results Header */}
          <div className="bg-green-600 text-white p-4 text-center">
            <h1 className="text-xl font-bold">Exam Results</h1>
            <div className="mt-2 flex justify-center gap-4 text-sm">
              <div>Score: {score}/{questions.length}</div>
              <div>Time: {formatTime()}</div>
            </div>
          </div>

          {/* Results Body */}
          <div className="p-4">
            <div className="space-y-3 mb-4">
              {questions.map((q, index) => (
                <div 
                  key={q.id}
                  className={`p-3 rounded-lg border text-sm ${
                    answers[index] === q.answer
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="font-medium">{q.text}</div>
                  <div className="mt-1">
                    <span className="font-semibold">Your answer:</span> {answers[index] || "Not answered"}
                  </div>
                  {answers[index] !== q.answer && (
                    <div className="mt-1">
                      <span className="font-semibold">Correct answer:</span> {q.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <AdBanner />

            <button
              onClick={() => {
                setCurrentQ(0);
                setSelected(null);
                setAnswers({});
                setShowResults(false);
                setTimeLeft(duration);
              }}
              className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Quiz Header */}
        <div className="bg-indigo-600 text-white p-4 text-center">
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{formatTime()}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>Question {currentQ + 1}/{questions.length}</span>
            </div>
          </div>
        </div>

        {/* Question Body */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {questions[currentQ].text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQ].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelected(option)}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all flex items-center ${
                  selected === option
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                  selected === option 
                    ? 'bg-indigo-500' 
                    : 'border-2 border-gray-400'
                }`}>
                  {selected === option && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-3 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentQ === 0}
              className={`flex-1 py-2 rounded-lg text-sm ${
                currentQ === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Previous
            </button>
            
            {currentQ === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  !selected
                    ? 'bg-indigo-300 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Next
              </button>
            )}
          </div>

          {/* Ad Banner */}
          <AdBanner />
        </div>
      </div>
    </div>
  );
}