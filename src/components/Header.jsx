import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { avatarImage, name, score } = this.props;
    return (
      <header>
        <img
          src={ avatarImage }
          alt="foto de perfil"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">
          <span>Score:</span>
          { score }
        </span>
      </header>
    );
  }
}
Header.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  avatarImage: state.player.avatarImage,
  name: state.player.name,
  score: state.player.score,
});
export default connect(mapStateToProps)(Header);
