import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  handleValidation = () => {
    const { name, email } = this.state;
    const magicNumber = 1;
    const isValid = name.length < magicNumber || email.length < magicNumber;
    this.setState({
      isDisable: isValid,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleValidation();
    });
  };

  handleClick = () => {

  };

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}
