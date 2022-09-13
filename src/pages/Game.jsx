import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getFromLocalStorage,
  removeFromLocalHistorage,
} from '../service/localStorage';
import { isFetchingAction, invalidTokenAction } from '../redux/actions/tokens';
import getQuestionsFromAPI from '../service/getQuestionsFromAPI';
import Header from '../components/Header';
import Questions from '../components/Questions';
import './Game.css';
import { timeOutUser, scoreActions } from '../redux/actions/Player';

class Game extends Component {
  state = {
    questionsGame: [],
    randomAnswers: [],
  };

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const token = getFromLocalStorage();
    dispatch(isFetchingAction(false));
    const questions = await getQuestionsFromAPI(token);
    if (questions.length === 0) {
      const timeOfInterval = 3000;
      dispatch(invalidTokenAction(true));
      setTimeout(() => {
        removeFromLocalHistorage();
        history.push('/');
      }, timeOfInterval);
    }
    this.setState({
      questionsGame: questions,
    });
    if (questions.length > 0) {
      this.getElementsOfQuestion(questions);
    }
  }

  componentDidUpdate(prevProps) {
    const { timeOut } = this.props;
    const { questionsGame } = this.state;
    if (prevProps.timeOut !== timeOut) {
      this.getElementsOfQuestion(questionsGame);
    }
  }

  addColorOnClick = ({ target }) => {
    const { dispatch } = this.props;
    const teste = target.parentNode;
    teste.className = 'color-answers';
    dispatch(scoreActions(this.handleScore(target)));
  };

  totalScore = () => {
    const { questionsGame } = this.state;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    switch (questionsGame[0].difficulty) {
    case 'easy':
      return easy;
    case 'medium':
      return medium;
    case 'hard':
      return hard;
    default:
      return 0;
    }
  };

  handleScore = (target) => {
    const { myTimer, dispatch } = this.props;
    if (target.id.includes('correct')) {
      clearInterval(myTimer);
      const { remaningTime } = this.props;
      const pointOfDifficulty = this.totalScore();
      const magicNumber = 10;
      const actualRemaningTime = Number(remaningTime) - 1;
      const pointsTotal = Number(
        magicNumber + ((actualRemaningTime) * (pointOfDifficulty)),
      );
      return pointsTotal;
    }
    const points = 0;
    clearInterval(myTimer);
    dispatch(timeOutUser(true));
    return points;
  };

  getElementsOfQuestion = async (questions) => {
    const { timeOut } = this.props;
    let answerOptions = questions[0].incorrect_answers.map((answer, index) => (
      <button
        type="button"
        key={ index }
        disabled={ timeOut }
        id={ `wrong-answer-${index}` }
        data-testid={ `wrong-answer-${index}` }
        className="wrong-answers"
        onClick={ this.addColorOnClick }
      >
        {answer}
      </button>
    ));

    answerOptions = [
      ...answerOptions,
      <button
        type="button"
        data-testid="correct-answer"
        id="correct-answer"
        className="correct-answer"
        key="3"
        disabled={ timeOut }
        onClick={ this.addColorOnClick }
      >
        {questions[0].correct_answer}
      </button>,
    ];

    const sortValue = 0.5;

    const random = answerOptions.sort(() => Math.random() - sortValue);

    this.setState({ randomAnswers: await random });
  };

  render() {
    const { isFetching, invalidToken } = this.props;
    const { questionsGame, randomAnswers } = this.state;

    return (
      questionsGame.length !== 0 && (
        <div>
          <div>
            {invalidToken && <h1>Token Inválido, você será redirecionado!</h1>}
          </div>
          <div>
            {!invalidToken && (
              <div>
                {isFetching ? (
                  <h1>Carregando...</h1>
                ) : (
                  <div>
                    <Header />
                    <Questions
                      questions={ questionsGame[0] }
                      AnswersRandom={ randomAnswers }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.TokenReducer.isFetching,
  invalidToken: state.TokenReducer.invalidToken,
  timeOut: state.player.time,
  myTimer: state.player.myTimer,
  remaningTime: state.player.remaningTime,
});

export default connect(mapStateToProps)(Game);

Game.defaultProps = {
  isFetching: false,
  invalidToken: false,
};

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isFetching: PropTypes.bool,
  invalidToken: PropTypes.bool,
  timeOut: PropTypes.bool.isRequired,
  myTimer: PropTypes.number.isRequired,
  remaningTime: PropTypes.number.isRequired,
};
