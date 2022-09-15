import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRakingLocalStorage } from '../service/localStorageFromRankign';

class Ranking extends Component {
  state = {
    rankUser: [],
  };

  componentDidMount() {
    const getRanking = getRakingLocalStorage();
    this.setState({ rankUser: getRanking });
  }

  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rankUser } = this.state;
    const rankingSort = rankUser.sort((a, b) => {
      const number = -1;
      if (a.score > b.score) return number;
      if (a.score < b.score) return 1;
      return 0;
    });

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { rankingSort.map((user, index) => (
            <div key={ index }>
              <img src={ user.email } alt="imagem do usuário" />
              <p data-testid={ `player-name-${index}` }>{ user.name }</p>
              <p data-testid={ `player-score-${index}` }>{ user.score }</p>
            </div>
          )) }
        </div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.goToHome }
        >
          início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
