import React, { useEffect } from 'react';
import { useQuestionStore } from '../store/questionStore';

export const Timer: React.FC = () => {
  const { timeLeft, setTimeLeft, currentQuestionIndex, questions, setCurrentQuestionIndex, isTestComplete } = useQuestionStore();

  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (isTestComplete) return;

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex, questions.length, isTestComplete]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center">
        <span className="text-2xl font-bold dark:text-white">{timeLeft}s</span>
      </div>
    </div>
  );
};