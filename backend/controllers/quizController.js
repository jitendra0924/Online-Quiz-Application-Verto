const db = require("../db");

const getQuizzes = (req, res) => {
  db.all("SELECT * FROM quizzes", [], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const getQuestions = (req, res) => {
  const { quizId } = req.params;
db.all(
  "SELECT id, question, optionA, optionB, optionC, optionD, correctOption FROM questions WHERE quizId = ?",
  [quizId],
  (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const formatted = result.map((q) => ({
      id: q.id,
      question: q.question,
      options: {
        A: q.optionA,
        B: q.optionB,
        C: q.optionC,
        D: q.optionD,
      },
      correctOption: q.correctOption,
    }));

    res.json(formatted);
  }
);

};


const submitAnswers = (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;
  let score = 0;

  db.all(
  "SELECT id, question, optionA, optionB, optionC, optionD, correctOption FROM questions WHERE quizId = ?",
  [quizId],
  (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const results = result.map((q) => {
      const userAnswer = answers[q.id] || null;
      const isCorrect = userAnswer && userAnswer.toUpperCase() === q.correctOption;

      if (isCorrect) score++;

      return {
        id: q.id,
        question: q.question,
        options: {
          A: q.optionA,
          B: q.optionB,
          C: q.optionC,
          D: q.optionD,
        },
        correctOption: q.correctOption,
        userAnswer,
        isCorrect,
      };
    });

    res.json({ score, total: result.length, results });
  }
);
};

module.exports = { getQuizzes, getQuestions, submitAnswers };
