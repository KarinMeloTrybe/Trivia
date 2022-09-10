import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { avatarImage } = this.props;
    return (
      <header>
        <img
          src={ avatarImage }
          alt="foto de perfil"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name" />
        <span data-testid="header-score" />
      </header>
    );
  }
}
Header.propTypes = {
  avatarImage: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  avatarImage: state.player.avatarImage,
});
export default connect(mapStateToProps)(Header);
