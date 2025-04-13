import { create } from 'zustand';
import { QuestionState } from '../types';

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  timeLeft: 30,
  isLoading: false,
  error: null,
  isTestComplete: false,

  fetchQuestions: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`https://run.mocky.io/v3/${import.meta.env.VITE_MOCKY_SECRET}`);
      const data = await response.json();
      set({ questions: data.data.questions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch questions', isLoading: false });
    }
  },

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  
  setUserAnswer: (questionId, answers) => 
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionId]: answers }
    })),

  setTimeLeft: (time) => set({ timeLeft: time }),
  
  endTest: () => set({ isTestComplete: true }),
  
  resetTest: () => set({
    currentQuestionIndex: 0,
    userAnswers: {},
    timeLeft: 30,
    isTestComplete: false
  })
}));