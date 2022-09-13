import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOutUser, remaningResponseTime, idMyTimer } from '../redux/actions/Player';

class Questions extends Component {
  state = {
    secondsTimer: 30,
    timer: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const ONE_SECOND = 1000;
    const myTimer = setInterval(() => {
      const { secondsTimer } = this.state;
      this.setState((prevState) => ({
        secondsTimer: prevState.secondsTimer - 1,
      }));
      dispatch(remaningResponseTime(secondsTimer));
    }, ONE_SECOND);
    this.setState({
      timer: myTimer,
    });
    dispatch(idMyTimer(myTimer));
  }

  componentDidUpdate() {
    const { secondsTimer, timer } = this.state;
    const { dispatch } = this.props;
    if (secondsTimer === 0) {
      clearInterval(timer);
      dispatch(timeOutUser(true));
    }
  }

  render() {
    const { questions, AnswersRandom } = this.props;
    const { secondsTimer } = this.state;

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
  dispatch: PropTypes.func.isRequired,
};
