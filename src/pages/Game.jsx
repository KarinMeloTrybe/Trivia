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
    const teste = target.parentNode;
    teste.className = 'color-answers';
  };

  // goToNextQuestion = () => {
  //   this.setState(prevState, () => {
  //     this.setState({
  //       actualQuestion: prevState.actualQuestion + 1,
  //     });
  //   });
  // };

  getElementsOfQuestion = async (questions) => {
    const { timeOut } = this.props;
    let answerOptions = questions[0].incorrect_answers.map((answer, index) => (
      <button
        type="button"
        key={ index }
        disabled={ timeOut }
        data-testid={ `wrong-answer-${index}` }
        id={ `wrong-answer-${index}` }
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
};
