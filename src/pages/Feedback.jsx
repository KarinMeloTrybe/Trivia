import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { saveRaking } from '../service/localStorageFromRankign';
import { timeOutUser } from '../redux/actions/Player';

const MIN = 3;

class Feedback extends Component {
  componentDidMount() {
    const { name, email, score, dispatch } = this.props;
    const userData = {
      name,
      email: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
      score,
    };
    saveRaking(userData);
    dispatch(timeOutUser(false));
  }

  handonPlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(timeOutUser(false));
    history.push('/');
  };

  handonRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;

    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          {assertions < MIN
            ? <span>Could be better...</span> : <span>Well Done!</span>}
        </h3>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handonPlayAgain }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handonRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.email,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
