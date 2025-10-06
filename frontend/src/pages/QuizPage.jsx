import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getQuestions, submitAnswers } from "../services/quizService";
import QuestionCard from "../components/QuestionCard";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const duration = location.state?.duration || 60;
  const quizName = location.state?.name || `Quiz ${id}`;


  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration); 

  useEffect(() => {
    getQuestions(id)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, [id]);

  useEffect(() => {
    if (timeLeft === null || score !== null) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, score]);

  const handleAnswer = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = () => {
    submitAnswers(id, answers)
      .then((res) => setScore(res.data))
      .catch((err) => console.error("Error submitting answers:", err));
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>{quizName}</h4>
        {score === null && <h4 className="text-danger">⏱ {timeLeft}s</h4>}
      </div>

      {!score &&
        questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selectedAnswer={answers[q.id]}
            onAnswer={handleAnswer}
          />
        ))}

      {score &&
        score.results.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selectedAnswer={q.userAnswer}
            correctAnswer={q.correctOption}
            showResult={true}
          />
        ))}

      {!score && (
        <button className="btn btn-success w-100" onClick={handleSubmit}>
          Submit Answers
        </button>
      )}

      {score && (
        <div className="text-center mt-4">
          <h3 className="mb-3">
            You scored {score.score} out of {score.total}
          </h3>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Back to Tests
            </button>
            <button
              className="btn btn-warning"
              onClick={() => window.location.reload()}
            >
              Reattempt Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;