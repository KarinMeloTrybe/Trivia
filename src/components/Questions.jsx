import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Questions extends Component {
  render() {
    const { questions } = this.props;
    let answerOptions = questions.incorrect_answers.map((answer, index) => (
      <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
        {answer}
      </button>
    ));

    answerOptions = [
      ...answerOptions,
      <button type="button" data-testid="correct-answer" key="3">
        {questions.correct_answer}
      </button>,
    ];

    const sortValue = 0.5;

    const random = answerOptions.sort(() => Math.random() - sortValue);

    return (
      <div>
        <h3 data-testid="question-category">
          Categoria:
          {questions.category}
        </h3>
        <h3 data-testid="question-text">
          {questions.question}
        </h3>
        <div data-testid="answer-options">
          { random }
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  }).isRequired,
};
