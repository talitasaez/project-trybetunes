/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    name: '',
    disabled: true,
    loading: false,
    loggedIn: false,
  };

  userLoading = () => {
    this.setState({ loading: true }, async () => {
      const { name } = this.state;
      await createUser({ name });
      this.setState({ loggedIn: true });
    });
  };

  buttonDisabled = () => {
    const { name } = this.state;
    const min = 3;
    if (name.length >= min) {
      this.setState({ disabled: false });
    }
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.buttonDisabled());
  };

  render() {
    const { disabled, loading, loggedIn } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.userLoading }
            >
              Entrar
            </button>

          </form>
        )}
        { loggedIn && <Redirect to="/search" />}
      </div>
    );
  }
}
