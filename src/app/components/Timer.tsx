import React, { useState, useEffect } from 'react';

interface TimerProps {
  totalTime?: number; // Time in seconds
  onTimeUp: () => void; // Callback when time is up
}

const Timer: React.FC<TimerProps> = ({ totalTime=600, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getTimerColor = () => {
    if (timeLeft > 900) return 'text-green-300';
    if (timeLeft > 300) return 'text-yellow-300';
    return 'text-red-300';
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full shadow-md">
      {/* <ClockCircleOutlined style={{ fontSize: '24px', color: 'white' }} /> */}
      <span className={`font-mono ${getTimerColor()} ${timeLeft < 300 ? 'text-2xl' : 'text-xl'}`}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
};

export default Timer;