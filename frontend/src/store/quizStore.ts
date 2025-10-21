import { create } from 'zustand';

interface Question {
  questionText: string;
  questionType: string;
  options: string[];
  correctAnswer: string;
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  explanation: string;
  points: number;
}

interface Quiz {
  _id: string;
  title: string;
  category: string;
  difficulty: string;
  questions: Question[];
  totalPoints: number;
  timeLimit: number;
}

interface Answer {
  questionIndex: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Answer[];
  score: number;
  startTime: number | null;
  questionStartTime: number | null;
  isQuizActive: boolean;
  
  setQuiz: (quiz: Quiz) => void;
  startQuiz: () => void;
  answerQuestion: (answer: string) => void;
  nextQuestion: () => void;
  endQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  startTime: null,
  questionStartTime: null,
  isQuizActive: false,

  setQuiz: (quiz) => set({ currentQuiz: quiz }),

  startQuiz: () => set({ 
    isQuizActive: true, 
    startTime: Date.now(),
    questionStartTime: Date.now(),
    currentQuestionIndex: 0,
    answers: [],
    score: 0
  }),

  answerQuestion: (selectedAnswer) => {
    const state = get();
    if (!state.currentQuiz || !state.isQuizActive) return;

    const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = state.questionStartTime 
      ? Math.floor((Date.now() - state.questionStartTime) / 1000)
      : 0;

    const newAnswer: Answer = {
      questionIndex: state.currentQuestionIndex,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent,
    };

    set({
      answers: [...state.answers, newAnswer],
      score: isCorrect ? state.score + currentQuestion.points : state.score,
    });
  },

  nextQuestion: () => {
    const state = get();
    if (!state.currentQuiz) return;

    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < state.currentQuiz.questions.length) {
      set({ 
        currentQuestionIndex: nextIndex,
        questionStartTime: Date.now()
      });
    } else {
      get().endQuiz();
    }
  },

  endQuiz: () => set({ isQuizActive: false }),

  resetQuiz: () => set({
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
    startTime: null,
    questionStartTime: null,
    isQuizActive: false,
  }),
}));
