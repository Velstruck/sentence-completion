import { useEffect } from "react";
import { useQuestionStore } from "./store/questionStore";
import { QuestionCard } from "./components/QuestionCard";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const {
    fetchQuestions,
    isLoading,
    error,
    questions,
    currentQuestionIndex,
    userAnswers,
    setCurrentQuestionIndex,
    isTestComplete,
  } = useQuestionStore();

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const isQuizComplete =
    currentQuestionIndex >= questions.length || isTestComplete;
  const currentQuestion = questions[currentQuestionIndex];

  const blankCount =
    currentQuestion?.question?.split("_____________").length - 1 || 0;
  const currentAnswers = userAnswers[currentQuestion?.questionId] || [];
  const isAllAnswered =
    currentAnswers.length === blankCount &&
    currentAnswers.every((ans) => ans.trim() !== "");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        {!isQuizComplete ? (
          <div className="max-w-4xl mx-auto">
            <QuestionCard />
            <div className="text-center mt-6">
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
                disabled={!isAllAnswered}
                className={`px-6 py-3 rounded-lg transition-colors mx-auto block ${
                  isAllAnswered
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          <FeedbackScreen />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
