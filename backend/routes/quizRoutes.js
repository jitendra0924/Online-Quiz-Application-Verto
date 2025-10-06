const express = require("express");
const { getQuizzes, getQuestions, submitAnswers } = require("../controllers/quizController");

const router = express.Router();

router.get("/tests", getQuizzes); 
router.get("/:quizId", getQuestions); 
router.post("/:quizId", submitAnswers);

module.exports = router;
