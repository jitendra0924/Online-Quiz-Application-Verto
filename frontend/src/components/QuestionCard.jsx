function QuestionCard({ question, selectedAnswer, onAnswer, correctAnswer, showResult }) {
  const renderOption = (key, text) => {
    let className = "btn w-100 text-start mb-2";
    let index = 0;
    

    if (showResult) {
      if (key === correctAnswer) {
        className += " btn-success"; 
      } else if (key === selectedAnswer && key !== correctAnswer) {
        className += " btn-danger";
      } else {
        className += " btn-outline-secondary";
      }
    } else {
      className += selectedAnswer === key ? " btn-primary" : " btn-outline-secondary";
    }

    return (
      <button
        key={key}
        disabled={showResult}
        className={className}
        onClick={() => !showResult && onAnswer(question.id, key)}
      >
        {key}. {text}
      </button>
    );
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{"Q"}. {question.question}</h5>
        {Object.entries(question.options).map(([key, text]) =>
          renderOption(key, text)
        )}
      </div>
    </div>
  );
}
export default QuestionCard;