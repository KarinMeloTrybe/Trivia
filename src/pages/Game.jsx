import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFromLocalStorage, removeFromLocalHistorage } from '../service/localStorage';
import { isFetchingAction, invalidTokenAction } from '../redux/actions/tokens';
import getQuestionsFromAPI from '../service/getQuestionsFromAPI';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { timeOutUser, scoreActions, restartTimer, remaningResponseTime,
  idMyTimer, changeTimer, changeAssertions } from '../redux/actions/Player';

const magicNumber = 4;

class Game extends Component {
  state = {
    questionsGame: [],
    randomAnswers: [],
    actualQuestion: 0,
    btnVisible: false,
    timer: '',
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
    this.stopTime();
    if (prevProps.timeOut !== timeOut) {
      this.getElementsOfQuestion(questionsGame);
      this.setState({ btnVisible: true });
    }
  }

  counterTime = () => {
    const { dispatch, secondsTimer } = this.props;
    const ONE_SECOND = 1000;
    const myTimer = setInterval(() => {
      dispatch(changeTimer());
      dispatch(remaningResponseTime(secondsTimer));
    }, ONE_SECOND);
    this.setState({ timer: myTimer });
    dispatch(idMyTimer(myTimer));
  };

  stopTime = () => {
    const { timer } = this.state;
    const { dispatch, secondsTimer } = this.props;
    if (secondsTimer === 0) {
      clearInterval(timer);
      dispatch(timeOutUser(true));
    }
  };

  endGame = () => {
    const { actualQuestion } = this.state;
    const { history } = this.props;
    if (actualQuestion === magicNumber) {
      history.push('/feedback');
    }
  };

  goToNextQuestion = ({ target }) => {
    const { questionsGame, actualQuestion } = this.state;
    const teste = target.parentNode.children[1].children[3];
    teste.className = '';
    if (actualQuestion < magicNumber) {
      this.setState((prevState) => ({
        actualQuestion: prevState.actualQuestion + 1,
        btnVisible: false,
      }), () => {
        const { dispatch } = this.props;
        dispatch(timeOutUser(false));
        dispatch(restartTimer());
        this.getElementsOfQuestion(questionsGame);
        this.counterTime();
      });
    }
    this.endGame();
  };

  addColorOnClick = ({ target }) => {
    const { dispatch } = this.props;
    const teste = target.parentNode;
    teste.className = 'color-answers';
    const score = this.handleScore(target);
    dispatch(scoreActions(score));
    this.stopTime();
    this.setState({ btnVisible: true });
  };

  totalScore = () => {
    const { questionsGame } = this.state;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    switch (questionsGame[0].difficulty) {
    case 'easy': return easy;
    case 'medium': return medium;
    case 'hard': return hard;
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
      const magicNumber1 = 10;
      const actualRemaningTime = Number(remaningTime) - 1;
      const pointsTotal = Number(
        magicNumber1 + ((actualRemaningTime) * (pointOfDifficulty)),
      );
      dispatch(changeAssertions());
      return pointsTotal;
    }
    const points = 0;
    clearInterval(myTimer);
    dispatch(timeOutUser(true));
    return points;
  };

  getElementsOfQuestion = (questions) => {
    const { actualQuestion } = this.state;
    const { timeOut } = this.props;
    let answerOptions = questions[actualQuestion].incorrect_answers
      .map((answer, index) => (
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
        {questions[actualQuestion].correct_answer}
      </button>,
    ];
    const sortValue = 0.5;
    const random = answerOptions.sort(() => Math.random() - sortValue);
    this.setState({ randomAnswers: random });
  };

  render() {
    const { isFetching, invalidToken } = this.props;
    const { questionsGame, randomAnswers, btnVisible, actualQuestion } = this.state;
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
                  <div name="container">
                    <Header />
                    <Questions
                      questions={ questionsGame[actualQuestion] }
                      AnswersRandom={ randomAnswers }
                      counterTime={ this.counterTime }
                    />
                    { btnVisible && (
                      <button
                        type="button"
                        data-testid="btn-next"
                        onClick={ this.goToNextQuestion }
                      >
                        Next
                      </button>) }
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
  secondsTimer: state.player.secondsTimer,
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
  secondsTimer: PropTypes.number.isRequired,
};
