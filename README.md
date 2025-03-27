# Open Trivia App

Welcome to the Open Trivia App, a fun quiz application that allows you to take multiple-choice trivia quizzes based on categories and difficulty levels! The app fetches questions from the [Open Trivia Database](https://opentdb.com/) API.

## Features

- **Home Page:** A form for users to input their name, choose a category, difficulty level, and number of questions.
- **Question Form:** After form submission, users are presented with a multiple-choice question.
- **Results Section:** After answering, users are told if they answered correctly or incorrectly, with the option to try again.
  
## Technologies Used

- **React** for building the user interface.
- **HTML5** and **CSS3** for structure and styling.
- **Open Trivia API** for fetching trivia questions.

## Getting Started

### Prerequisites

To run this project locally, you will need:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/SmittyDeuce/open-trivia-app.git

### Usage

1. **Home Page:**
    - Input your name.
    - Select a trivia category from the dropdown.
    - Choose a difficulty level (easy, medium, hard).
    - Specify how many questions you want to answer.
    - Click "Start Quiz" to proceed.

2. **Answer Questions:**
    - After submitting the form, you'll be presented with a trivia question and multiple answers.
    - Select your answer and click "Submit".

3. **View Results:**
    - After answering the question, you'll be shown whether you got the answer correct or incorrect.
    - The correct answer will be displayed if you answer incorrectly.
    - You can then press "Try Again" to get a new question.

### API

The app uses the [Open Trivia Database](https://opentdb.com/) API to fetch trivia questions. The API supports different categories and difficulty levels. The app fetches 10 questions by default but can handle different amounts based on user input.