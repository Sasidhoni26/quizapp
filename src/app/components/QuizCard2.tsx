"use client";

import { useState, useEffect } from "react";

export default function TNPSCQuiz() {
  const questions = [
    {
      id: 1,
      text: "Which is the first wildlife sanctuary in Tamil Nadu?",
      options: [
        "Mudumalai Wildlife Sanctuary",
        "Vedanthangal Bird Sanctuary",
        "Indira Gandhi Wildlife Sanctuary",
        "Kalakad Wildlife Sanctuary",
      ],
      answer: "Vedanthangal Bird Sanctuary",
    },
    {
      id: 2,
      text: "The famous 'Kurinji' flower blooms once in how many years?",
      options: ["5", "12", "7", "10"],
      answer: "12",
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    if (showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleNext = () => {
    if (selected) {
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
    const finalAnswers = selected
      ? { ...answers, [currentQ]: selected }
      : answers;
    const correctAnswers = questions.reduce((count, q, index) => {
      return finalAnswers[index] === q.answer ? count + 1 : count;
    }, 0);

    setAnswers(finalAnswers);
    setScore(correctAnswers);
    setShowResults(true);
  };

  const AdBanner = () => (
    <div className="mt-6 w-full bg-gray-100 rounded-lg p-3 text-center">
      <div className="text-xs text-gray-500 mb-1">ADVERTISEMENT</div>
      <div className="h-[90px] md:h-[120px] w-full flex items-center justify-center bg-gray-200 rounded">
        {/* Replace with actual ad code */}
        <span className="text-gray-500">
          {window.innerWidth > 768
            ? "Leaderboard (728x90)"
            : "Mobile Banner (320x50)"}
        </span>
      </div>
    </div>
  );

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-600 text-white p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Exam Results</h1>
            <div className="mt-2 flex justify-center gap-4 text-white/90">
              <div>
                Score: {score}/{questions.length}
              </div>
              <div>Time: {formatTime()}</div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-4 mb-8">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className={`p-4 md:p-5 rounded-xl border-2 text-lg ${
                    answers[index] === q.answer
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  <div className="font-semibold mb-2">{q.text}</div>
                  <div className="text-base">
                    <span className="font-medium">Your answer:</span>{" "}
                    {answers[index] || "Not answered"}
                  </div>
                  {answers[index] !== q.answer && (
                    <div className="text-base mt-1">
                      <span className="font-medium">Correct answer:</span>{" "}
                      {q.answer}
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
                setTimeLeft(1800);
              }}
              className="w-full mt-6 py-3 md:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-medium"
            >
              Restart Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Simplified Header */}
        <div className="bg-indigo-700 text-white p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            TNPSC Group 2 Exam Practice
          </h1>
          <div className="mt-3 flex justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formatTime()}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Question {currentQ + 1}/{questions.length}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 md:mb-8">
            {questions[currentQ].text}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {questions[currentQ].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelected(option)}
                className={`w-full p-4 md:p-5 text-left rounded-xl border-2 transition-all flex items-center ${
                  selected === option
                    ? "border-indigo-500 bg-indigo-50 shadow-md"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mr-4 flex-shrink-0 flex items-center justify-center ${
                    selected === option
                      ? "bg-indigo-600"
                      : "border-2 border-gray-400"
                  }`}
                >
                  {selected === option && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-lg md:text-xl">{option}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between gap-5">
            <button
              onClick={handlePrev}
              disabled={currentQ === 0}
              className={`flex-1 py-3 md:py-4 rounded-xl text-lg font-medium ${
                currentQ === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ← Previous
            </button>

            {currentQ === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 md:py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-medium"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-3 md:py-4 rounded-xl text-lg font-medium ${
                  !selected
                    ? "bg-indigo-300 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Next →
              </button>
            )}
          </div>

          <AdBanner />
        </div>
      </div>
    </div>
  );
}
