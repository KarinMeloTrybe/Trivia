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

class Game extends Component {
  state = {
    questionsGame: [],
    // actualQuestion: 1,
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
    this.setState({ questionsGame: questions });
  }

  // goToNextQuestion = () => {
  //   this.setState(prevState, () => {
  //     this.setState({
  //       actualQuestion: prevState.actualQuestion + 1,
  //     });
  //   });
  // };

  render() {
    const { isFetching, invalidToken } = this.props;
    const { questionsGame } = this.state;
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
                    <Questions questions={ questionsGame[0] } />
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
};
