"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR from "swr";

// Function to fetch data from the API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TNPSCQuiz() {
  const searchParams = useSearchParams();
  const collectionName = searchParams?.get("collectionName");

  const { data: questions } = useSWR(
    `${process.env.API_URL}/s1/quiz/auth/getQuestionsByCollection?collectionName=${collectionName}`,
    fetcher
  );

  // State management
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions?.length * 60 || 600); // 30 minutes in seconds

  // Timer effect
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

      if (currentQ < questions?.length - 1) {
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
    // Capture final answer before submission
    const finalAnswers = selected
      ? { ...answers, [currentQ]: selected }
      : answers;

    // Calculate score
    // const correctAnswers = (questions || [])?.reduce(
    //   (count: number, q: any, index: number) => {
    //     return finalAnswers[index] === q.answer ? count + 1 : count;
    //   },
    //   0
    // );

    setAnswers(finalAnswers);
    // setScore(correctAnswers);
    setShowResults(true);
  };

  // Ad banner component
  const AdBanner = () => (
    <div className="mt-4 bg-gray-100 border border-gray-200 rounded-lg p-2 text-center">
      <div className="text-xs text-gray-500 mb-1">ADVERTISEMENT</div>
      <div className="h-[90px] w-full flex items-center justify-center bg-gray-200 rounded">
        {/* Replace with actual ad code */}
        <span className="text-gray-500">Ad Banner (728x90)</span>
      </div>
    </div>
  );

  if (showResults) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Results Header */}
          <div className="bg-green-600 text-white p-4 text-center">
            <h1 className="text-xl font-bold">Exam Results</h1>
          </div>

          {/* Results Body */}
          <div className="p-4">
            <div className="text-center mb-4">
              {/* Message: You submitted */}
              <div className="text-3xl font-bold text-blue-600 mb-2">
                You submitted
              </div>
              <div className="text-gray-600">
                Thank you for completing the quiz! 🎉
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-3 mb-4">
              {questions.map((q: QuestionCardProps, index: number) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-sm ${
                    answers[index] === q?.answer
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="font-medium">{q?.question}</div>
                  <div className="mt-1">
                    <span className="font-semibold">Your answer:</span>{" "}
                    {answers[index] || "Not answered"}
                  </div>
                  {answers[index] !== q?.answer && (
                    <div className="mt-1">
                      <span className="font-semibold">Correct answer:</span>{" "}
                      {q?.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Restart Button */}
            <button
              onClick={() => {
                setCurrentQ(0);
                setSelected(null);
                setAnswers({});
                setShowResults(false);
                setTimeLeft(1800);
                // setScore(0);
              }}
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions || questions?.length === 0) {
    return (
      <div className="h-[95vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="text-center text-xl font-bold text-gray-700">
          No questions available.
        </div>
      </div>
    );
  }

  return (
    <>
      {!showResults && (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Quiz Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h1 className="text-lg font-bold">TNPSC Practice</h1>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-mono">
                  {formatTime()}
                </div>
                <div className="bg-white/10 px-2 py-1 rounded-full text-xs">
                  Q: {currentQ + 1}/{questions?.length}
                </div>
              </div>
            </div>

            {/* Question Body */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {questions[currentQ]?.question || "No question available"}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {["optionA", "optionB", "optionC", "optionD"].map(
                  (optionKey, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelected(questions[currentQ][optionKey])
                      }
                      className={`w-full p-3 text-left rounded-lg border-2 transition-all flex items-center ${
                        selected === questions[currentQ][optionKey]
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                          selected === questions[currentQ][optionKey]
                            ? "bg-blue-500"
                            : "border-2 border-gray-400"
                        }`}
                      >
                        {selected === questions[currentQ][optionKey] && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-sm">
                        {questions[currentQ][optionKey]}
                      </span>
                    </button>
                  )
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-3 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentQ === 0}
                  className={`flex-1 py-2 rounded-lg text-sm ${
                    currentQ === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
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
      )}
    </>
  );
}
