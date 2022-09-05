import React, { Component } from 'react';
import Header from '../Components/Header';

export default class Search extends Component {
  state = {
    artist: '',
    disabled: true,
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.btninput);
  };

  btninput = () => {
    const { artist } = this.state;
    const artistMin = 2;
    if (artist.length >= artistMin) {
      this.setState({ disabled: false });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="artist"
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>

        </form>
      </div>
    );
  }
}
