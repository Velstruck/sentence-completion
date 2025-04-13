import React, { useEffect } from 'react';
import { useQuestionStore } from '../store/questionStore';
import { Timer } from './Timer';
import { FeedbackScreen } from './FeedbackScreen';

export const QuestionCard: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    setUserAnswer,
    endTest,
    isTestComplete,
  } = useQuestionStore();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Initialize blank answers if not already set
    if (currentQuestion && !userAnswers[currentQuestion.questionId]) {
      setUserAnswer(
        currentQuestion.questionId,
        Array(currentQuestion.correctAnswer.length).fill('')
      );
    }
  }, [currentQuestion, userAnswers, setUserAnswer]);

  if (isTestComplete || !currentQuestion) {
    return <FeedbackScreen />;
  }

  const words = currentQuestion.question.split('_____________');
  const currentAnswers = userAnswers[currentQuestion.questionId] || [];

  const handleWordSelect = (word: string) => {
    const newAnswers = [...currentAnswers];
    const emptyIndex = newAnswers.findIndex((ans) => !ans);
    if (emptyIndex !== -1) {
      newAnswers[emptyIndex] = word;
      setUserAnswer(currentQuestion.questionId, newAnswers);
    }
  };

  const handleBlankClick = (index: number) => {
    const newAnswers = [...currentAnswers];
    newAnswers[index] = '';
    setUserAnswer(currentQuestion.questionId, newAnswers);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold dark:text-white">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <div className="flex items-center gap-4">
          <Timer />
          <button
            onClick={endTest}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
          >
            End Test
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-lg dark:text-white">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              {word}
              {index < words.length - 1 && (
                <span
                  onClick={() => handleBlankClick(index)}
                  className={`inline-block mx-2 min-w-[120px] px-4 py-2 border-2 rounded cursor-pointer ${
                    currentAnswers[index]
                      ? 'bg-blue-100 text-gray-900 dark:bg-blue-900 dark:text-white border-blue-500'
                      : 'text-gray-500 dark:text-gray-400 border-gray-300'
                  }`}
                >
                  {currentAnswers[index] || '_____'}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleWordSelect(option)}
              disabled={currentAnswers.includes(option)}
              className={`p-4 text-lg rounded-lg transition-colors ${
                currentAnswers.includes(option)
                  ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed dark:text-gray-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
