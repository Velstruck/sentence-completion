export interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

export interface QuestionState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, string[]>;
  timeLeft: number;
  isLoading: boolean;
  error: string | null;
  isTestComplete: boolean;
  fetchQuestions: () => Promise<void>;
  setCurrentQuestionIndex: (index: number) => void;
  setUserAnswer: (questionId: string, answers: string[]) => void;
  setTimeLeft: (time: number) => void;
  endTest: () => void;
  resetTest: () => void;
}