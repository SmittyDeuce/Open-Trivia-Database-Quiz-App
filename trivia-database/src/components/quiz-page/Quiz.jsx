import { useState } from "react";
import Results from "../results-page/Results";
import "./QuizStyles.css";

function Quiz({ questions, name, difficulty, category }) {
  const categoryNames = {
    9: "General Knowledge",
    21: "Sports",
    22: "Geography",
    11: "Entertainment: Film",
  };

  const categoryName = categoryNames[category] || "Unknown Category";

  // State to store user's answers
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState([]);

  // Handle answer selection
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedAnswer,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions have been answered
    if (Object.keys(userAnswers).length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setError("");

    // Check if the answers are correct
    const correctAnswers = questions.map((question, index) => {
      return userAnswers[index] === question.correct_answer;
    });

    setIsCorrect(correctAnswers);
    setShowResult(true);
  };

  return (
    <div className="main-container">
      <header className="header-container">
        <h1>{categoryName}</h1>
        <h2>{difficulty.toUpperCase()}</h2>
        <h3>Welcome, {name}! Good Luck</h3>
      </header>

      {showResult ? (
        <Results
          name={name}
          isCorrect={isCorrect}
          correctAnswers={questions.map((q) => q.correct_answer)}
          onRestart={() => setShowResult(false)} // Reset quiz state
        />
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            const answers = [
              ...question.incorrect_answers,
              question.correct_answer,
            ].sort(() => Math.random() - 0.5);

            return (
              <div key={index} className="question-block">
                <h4 dangerouslySetInnerHTML={{ __html: question.question }}></h4>
                <div className="answers">
                  {answers.map((answer, answerIndex) => (
                    <label key={answerIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer}
                        onChange={() => handleAnswerChange(index, answer)}
                        checked={userAnswers[index] === answer}
                      />
                      <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Submit Quiz</button>
        </form>
      )}
    </div>
  );
}

export default Quiz;
