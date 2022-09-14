import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  componentDidMount() {
    const { counterTime } = this.props;
    counterTime();
  }

  render() {
    const { questions, AnswersRandom, secondsTimer } = this.props;

    return (
      <div>
        <p>{secondsTimer}</p>
        <h3 data-testid="question-category">
          Categoria:
          {questions.category}
        </h3>
        <h3 data-testid="question-text">{questions.question}</h3>
        <div data-testid="answer-options">{AnswersRandom}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.TokenReducer.isFetching,
  invalidToken: state.TokenReducer.invalidToken,
  secondsTimer: state.player.secondsTimer,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  AnswersRandom: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  counterTime: PropTypes.func.isRequired,
  secondsTimer: PropTypes.number.isRequired,
};
