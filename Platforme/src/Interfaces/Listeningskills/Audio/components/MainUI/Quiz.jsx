import React, { useState } from "react";
import "./quiz-section.scss"; // Make sure to import the CSS file

const QuizSection = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  // Initialize with hardcoded questions for testing
  const questions = [
    {
      question: "What is the capital of France?",
      options: [
        { letter: "a", text: "Paris" },
        { letter: "b", text: "London" },
        { letter: "c", text: "Berlin" }
      ],
      correct_answer: { letter: "a", text: "Paris" }
    },
    {
      question: "What is 2 + 2?",
      options: [
        { letter: "a", text: "3" },
        { letter: "b", text: "4" },
        { letter: "c", text: "5" }
      ],
      correct_answer: { letter: "b", text: "4" }
    }
  ];

  // Use hardcoded questions or fallback to data prop
  const currentQuestions = data?.questions || questions;
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Determine if selected option is correct
    const isCorrect = option.letter === currentQuestion.correct_answer.letter;

    setFeedback(isCorrect ? "Correct!" : "Incorrect!");

    // Update score if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Wait for 1 second before moving to the next question
    setTimeout(() => {
      setFeedback("");
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        // Handle end of quiz: show final score
        alert(`Quiz completed! Your final score is ${score}/${currentQuestions.length}`);
      }
    }, 1000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="quiz-section">
      <div className="question-container">
        <h2>{currentQuestion.question}</h2>
      </div>
      <div className="options-container">
        {currentQuestion.options.map((option) => (
          <button
            key={option.letter}
            onClick={() => handleOptionClick(option)}
            className={`option-button ${
              selectedOption === option
                ? option.letter === currentQuestion.correct_answer.letter
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
          >
            {option.letter}) {option.text}
          </button>
        ))}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default QuizSection;
