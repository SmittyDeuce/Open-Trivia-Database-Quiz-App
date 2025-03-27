import React from "react";

function Results({ name, isCorrect, correctAnswers, onRestart }) {
  return (
    <div className="results-container">
      <h2>Quiz Results for {name}</h2>
      {isCorrect.map((correct, index) => (
        <div key={index} className="result-item">
          <p>
            Question {index + 1}: {correct ? "Correct!" : "Wrong!"}
          </p>
          {!correct && <p>Correct Answer: {correctAnswers[index]}</p>}
        </div>
      ))}
      <button onClick={onRestart}>Try Again</button>
    </div>
  );
}

export default Results;
