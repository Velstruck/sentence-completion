import React from 'react';
import { useQuestionStore } from '../store/questionStore';
import { CheckCircle, XCircle } from 'lucide-react';

export const FeedbackScreen: React.FC = () => {
  const { questions, userAnswers } = useQuestionStore();

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.questionId] || [];
      if (JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Your Results</h2>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors flex"
        >
          Restart Test
        </button>
      </div>
      <div className="text-2xl font-semibold mb-8 dark:text-white">
        Score: {calculateScore()} out of {questions.length}
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.questionId] || [];
          const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);

          return (
            <div key={question.questionId} className="border-b pb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-semibold dark:text-white">Question {index + 1}</span>
                {isCorrect ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <XCircle className="text-red-500 w-6 h-6" />
                )}
              </div>

              <div className="space-y-4">
                
                <div> {/*  correct answer */}
                  <h4 className="font-semibold mb-2 dark:text-white">Correct Answer:</h4>
                  <div className="p-4 rounded bg-gray-50 dark:bg-gray-700 dark:text-white">
                    {question.question.split('_____________').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="px-2 py-1 mx-1 rounded bg-green-100 dark:bg-green-200 text-green-800 dark:text-green-900">
                            {question.correctAnswer[i]}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">Your Answer:</h4>
                  <div className="p-4 rounded dark:text-white">
                    {question.question.split('_____________').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span
                            className={`px-2 py-1 mx-1 rounded ${
                              userAnswer[i] === question.correctAnswer[i]
                                ? 'bg-green-100 dark:bg-green-200 text-green-800 dark:text-green-900'
                                : 'bg-red-100 dark:bg-red-200 text-red-800 dark:text-red-900'
                            }`}
                          >
                            {userAnswer[i] || '(not answered)'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
