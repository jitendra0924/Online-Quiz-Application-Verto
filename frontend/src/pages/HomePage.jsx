import React, { useEffect, useState } from "react";
import { getTests } from "../services/quizService";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTests()
      .then((res) => setTests(res.data))
      .catch((err) => console.error("Error fetching tests:", err));
  }, []);

  return (
    <div>
      <h4>Select a Test</h4>
      <div className="list-group">
        {tests.map((test) => (
          <button
            key={test.id}
            className="list-group-item list-group-item-action"
            onClick={() => navigate(`/quiz/${test.id}`, { state: { duration: test.duration, name: test.name } })}
          >
            {test.name} ⏳ {test.duration}s
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;