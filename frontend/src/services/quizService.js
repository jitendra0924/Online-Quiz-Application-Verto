import api from "./api";

export const getTests = () => api.get("/tests");

export const getQuestions = (testId) => api.get(`/${testId}`);

export const submitAnswers = (testId, answers) =>
  api.post(`/${testId}`, { answers });
