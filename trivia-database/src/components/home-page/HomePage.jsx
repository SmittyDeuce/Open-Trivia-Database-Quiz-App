import { useState } from "react"; // Import useState hook
import "./HomePageStyles.css";

// "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"

function HomePage() {
  const [showForm, setShowForm] = useState(false); // Track if form is visible
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState(10); // Track number of questions
  const [questions, setQuestions] = useState([]); // Store questions fetched from API
  const [error, setError] = useState(""); // Handle errors // Track number of questions

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (name && category && difficulty) {
      // Build the API URL dynamically based on user input
      const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.response_code === 0) {
          setQuestions(data.results); // Set questions to state
          setShowForm(true); // Show the QuestionForm
        } else {
          setError("No questions with your preferences");
        }
      } catch (err) {
        setError("Couldn't fetch the questions. :( ...");
      }
    } else {
      alert("Please fill out all fields");
    }
  };

//   const handleClick = () => {
//     if (name && category && difficulty) {
//       setShowForm(true);
//     } else {
//       alert("Please fill out all fields");
//     }
//   };

return (
    <div className="main-container">
      <header className="header">
        <h1>Open Trivia</h1>
        <p>Welcome to my 'Open Trivia' API project</p>
      </header>

      <div className="instructions">
        <h2>Instructions</h2>
        <ul>
          <li>Enter Name</li>
          <li>Choose Topic</li>
          <li>Choose Difficulty</li>
          <li>Choose Number of Questions</li>
          <li>Press Start</li>
          <li>Enjoy!</li>
        </ul>
      </div>

      {/* Form for user inputs */}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="21">Sports</option>
            <option value="9">General Knowledge</option>
            <option value="11">Entertainment: Film</option>
            <option value="22">Geography</option>
          </select>
        </div>
        <div className="input-group">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="number"
            placeholder="Number of questions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="input-group">
          <button type="submit">START!</button> {/* Submits the form */}
        </div>
      </form>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Conditionally render the QuestionForm component */}
      {showForm && <QuestionForm questions={questions} name={name} />}
    </div>
  );
}

export default HomePage;
