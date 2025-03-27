import { useState } from "react"; // Import useState hook
import Quiz from "../quiz-page/Quiz";
import "./HomePageStyles.css";

// "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"

function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
    numQuestions: 10,
  });

  const [showForm, setShowForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, difficulty, numQuestions } = formData;

    if (name && category && difficulty) {
      const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.response_code === 0) {
          setQuestions(data.results);
          setShowForm(true);
          setError("");
        } else {
          setError("No questions with your preferences");
        }
      } catch (error) {
        setError("Couldn't fetch the questions :(");
      }
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Open Trivia</h1>
        <p>Welcome to my 'Open Trivia' API project</p>
      </header>

      <div className="instructions">
        <h2>Instructions</h2>
        <ul>
          <li>Enter your name</li>
          <li>Choose a topic</li>
          <li>Choose difficulty</li>
          <li>Select number of questions</li>
          <li>Press Start</li>
          <li>Have fun!</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="21">Sports</option>
            <option value="9">General Knowledge</option>
            <option value="11">Entertainment: Film</option>
            <option value="22">Geography</option>
          </select>
        </div>
        <div className="input-group">
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="number"
            name="numQuestions"
            placeholder="Number of questions"
            value={formData.numQuestions}
            onChange={(e) =>
              setFormData({ ...formData, numQuestions: Number(e.target.value) })
            }
            min="1"
            required
          />
        </div>
        <div className="input-group">
          <button type="submit">START!</button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      {showForm && (
        <Quiz
          questions={questions}
          name={formData.name}
          category={formData.category}
          difficulty={formData.difficulty}
        />
      )}
    </div>
  );
}

export default HomePage;
