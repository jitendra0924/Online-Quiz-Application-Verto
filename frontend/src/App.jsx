import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <div className="container my-4">
        <h1 className="text-center mb-4">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            📘 Quiz App
          </Link>
        </h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


