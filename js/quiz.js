export function createQuiz() {
  const total = 10;
  let state = { phase: "loading", questions: [], index: 0, selectedOptionId: null, answers: [] };
  const snapshot = () => ({ ...state, answers: state.answers.slice() });
  return {
    getState: snapshot,
    load(questions) {
      if (state.phase !== "loading") throw new Error("As quest\u00f5es s\u00f3 podem ser carregadas durante a inicializa\u00e7\u00e3o.");
      state = { phase: "intro", questions: questions.slice(), index: 0, selectedOptionId: null, answers: [] };
      return snapshot();
    },
    start() {
      if (state.phase !== "intro" || state.questions.length !== total) return snapshot();
      state = { ...state, phase: "question", index: 0, selectedOptionId: null, answers: [] };
      return snapshot();
    },
    select(optionId) {
      if (state.phase !== "question") return snapshot();
      if (state.questions[state.index].options.some(option => option.id === optionId)) state = { ...state, selectedOptionId: optionId };
      return snapshot();
    },
    submit() {
      if (state.phase !== "question" || !state.selectedOptionId) return { ...snapshot(), accepted: false };
      const question = state.questions[state.index];
      state = { ...state, phase: "feedback", answers: [...state.answers, state.selectedOptionId] };
      return { ...snapshot(), accepted: true, correct: state.selectedOptionId === question.correctOptionId };
    },
    next() {
      if (state.phase !== "feedback" || state.index >= total - 1) return snapshot();
      state = { ...state, phase: "question", index: state.index + 1, selectedOptionId: null };
      return snapshot();
    },
    showResult() {
      if (state.phase !== "feedback" || state.index !== total - 1 || state.answers.length !== total) return snapshot();
      state = { ...state, phase: "result" };
      return snapshot();
    },
    getResult() {
      if (state.phase !== "result") return null;
      const correct = state.answers.reduce((count, answer, index) => count + (answer === state.questions[index].correctOptionId ? 1 : 0), 0);
      return { correct, wrong: total - correct, percentage: correct / total * 100 };
    },
    restart() {
      if (state.phase !== "result") return snapshot();
      state = { ...state, phase: "intro", index: 0, selectedOptionId: null, answers: [] };
      return snapshot();
    }
  };
}

