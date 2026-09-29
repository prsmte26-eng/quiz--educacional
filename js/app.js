import { createQuiz } from "./quiz.js";

const $ = id => document.getElementById(id);
const quiz = createQuiz();
const views = ["loading", "intro", "error", "question-view", "result-view"];
const allowedTopics = new Set(["hardware", "software", "sistemas-arquivos", "redes-internet", "seguranca-privacidade", "algoritmos-programacao", "representacao-dados", "pensamento-computacional"]);
const showView = id => views.forEach(view => { $(view).hidden = view !== id; });

function validExplanation(text) {
  if (typeof text !== "string" || !text.trim() || !/[.!?]$/.test(text.trim())) return false;
  const sentences = text.trim().match(/[^.!?]+[.!?]+/g) || [];
  return sentences.length === 1 && text.trim().split(/\s+/).length <= 25;
}
function validateQuestions(data) {
  if (!Array.isArray(data) || data.length !== 10) throw new Error("O conjunto precisa conter exatamente 10 quest\u00f5es.");
  const ids = new Set();
  const topics = new Set();
  for (const question of data) {
    if (!question || typeof question.id !== "string" || !question.id.trim() || ids.has(question.id)) throw new Error("Cada quest\u00e3o precisa ter um identificador \u00fanico.");
    ids.add(question.id);
    if (!allowedTopics.has(question.topic)) throw new Error("Uma quest\u00e3o cont\u00e9m um tema inv\u00e1lido.");
    topics.add(question.topic);
    if (typeof question.prompt !== "string" || !question.prompt.trim()) throw new Error("Uma quest\u00e3o est\u00e1 sem enunciado.");
    if (!Array.isArray(question.options) || question.options.length !== 4) throw new Error("Cada quest\u00e3o precisa ter exatamente quatro alternativas.");
    const optionIds = new Set();
    for (const option of question.options) {
      if (!option || typeof option.id !== "string" || !option.id.trim() || optionIds.has(option.id) || typeof option.text !== "string" || !option.text.trim()) throw new Error("Uma quest\u00e3o cont\u00e9m uma alternativa inv\u00e1lida.");
      optionIds.add(option.id);
    }
    if (typeof question.correctOptionId !== "string" || !optionIds.has(question.correctOptionId)) throw new Error("Uma quest\u00e3o n\u00e3o identifica uma alternativa correta v\u00e1lida.");
    if (!validExplanation(question.explanation)) throw new Error("Uma quest\u00e3o cont\u00e9m uma explica\u00e7\u00e3o inv\u00e1lida.");
  }
  if (topics.size !== allowedTopics.size) throw new Error("O conjunto precisa abordar todos os temas de Computa\u00e7\u00e3o previstos.");
  return data;
}
function renderQuestion() {
  const state = quiz.getState();
  const question = state.questions[state.index];
  $("progress-label").textContent = `QUEST\u00c3O ${state.index + 1} DE 10`;
  $("progress-bar").style.width = `${(state.index + 1) * 10}%`;
  $("question-prompt").textContent = question.prompt;
  $("options").replaceChildren();
  question.options.forEach((option, index) => {
    const wrapper = document.createElement("div"); wrapper.className = "answer-option";
    const input = document.createElement("input"); input.type = "radio"; input.name = "answer"; input.id = `option-${option.id}`; input.value = option.id; input.checked = option.id === state.selectedOptionId;
    input.addEventListener("change", () => { quiz.select(option.id); $("selection-message").textContent = ""; });
    const label = document.createElement("label"); label.className = "answer-label"; label.htmlFor = input.id;
    const key = document.createElement("span"); key.className = "answer-key"; key.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span"); text.textContent = option.text;
    label.append(key, text); wrapper.append(input, label); $("options").append(wrapper);
  });
  $("answer-form").hidden = false; $("feedback").hidden = true; $("selection-message").textContent = "";
  showView("question-view"); $("question-prompt").focus();
}
$("start-button").addEventListener("click", () => { quiz.start(); renderQuestion(); });
$("answer-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!quiz.getState().selectedOptionId) { $("selection-message").textContent = "Selecione uma alternativa antes de confirmar."; return; }
  const state = quiz.getState(); const question = state.questions[state.index];
  const result = quiz.submit();
  $("answer-form").hidden = true; $("feedback").hidden = false;
  $("feedback").className = `feedback ${result.correct ? "is-correct" : "is-incorrect"}`;
  $("feedback-title").textContent = result.correct ? "Resposta correta!" : "Resposta incorreta.";
  $("feedback-copy").textContent = result.correct ? "Muito bem! Voc\u00ea acertou esta quest\u00e3o." : `A alternativa correta \u00e9: ${question.options.find(option => option.id === question.correctOptionId).text}`;
  $("explanation").hidden = result.correct; $("explanation").textContent = result.correct ? "" : question.explanation;
  const last = state.index === 9; $("next-button").hidden = last; $("result-button").hidden = !last;
  $(last ? "result-button" : "next-button").focus();
});
$("next-button").addEventListener("click", () => { quiz.next(); renderQuestion(); });
$("result-button").addEventListener("click", () => {
  quiz.showResult(); const result = quiz.getResult();
  $("correct-score").textContent = result.correct; $("wrong-score").textContent = result.wrong; $("percent-score").textContent = `${result.percentage}%`;
  showView("result-view"); $("result-view h1").focus();
});
$("restart-button").addEventListener("click", () => { quiz.restart(); showView("intro"); $("start-button").focus(); });
try {
  const response = await fetch("data/questions.json", { cache: "no-store" });
  if (!response.ok) throw new Error("N\u00e3o foi poss\u00edvel carregar as quest\u00f5es. Confira se os arquivos est\u00e3o sendo servidos por HTTP.");
  const questions = validateQuestions(await response.json()); quiz.load(questions); showView("intro");
} catch (error) {
  $("error-message").textContent = `${error.message || "O arquivo de quest\u00f5es n\u00e3o p\u00f4de ser lido."} Recarregue a p\u00e1gina ap\u00f3s corrigir o problema.`;
  showView("error");
}
