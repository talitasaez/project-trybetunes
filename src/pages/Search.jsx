import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Components/Header';
import searchAlbunsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

// requisito feito com a ajuda do colega FILIPE LIMA turma 24 B .

export default class Search extends Component {
  state = {
    artist: '',
    disabled: true,
    loading: false,
    albuns: [],
    searchArtist: '',
    notFauldArtist: false,
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.btninput);
  };

  searchApi = () => {
    const { artist } = this.state;
    this.setState({ searchArtist: artist });
    this.setState({ artist: '' });
    this.setState({ loading: true }, async () => {
      const artistApi = await searchAlbunsAPI(artist);
      this.setState({
        loading: false,
        albuns: artistApi,
      });
      if (artistApi.length <= 0) {
        this.setState({ notFauldArtist: true });
      } else {
        this.setState({ notFauldArtist: false });
      }
    });
  };

  btninput = () => {
    const { artist } = this.state;
    const artistMin = 2;
    if (artist.length >= artistMin) {
      this.setState({ disabled: false });
    }
  };

  render() {
    const { disabled, albuns, loading, searchArtist, notFauldArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form onSubmit={ (event) => event.preventDefault() }>
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
              onClick={ this.searchApi }
            >
              Pesquisar
            </button>

          </form>
        )}
        {albuns.length > 0 && (
          <p>
            Resultado de álbuns de:
            {' '}
            { searchArtist }
          </p>
        )}
        {albuns.length > 0 && albuns.map((album, index) => (
          <div key={ index }>
            <p>{ album.artistName }</p>
            <p>{ album.collectionName }</p>
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              Album
            </Link>
          </div>
        ))}
        { notFauldArtist && (<p> Nenhum álbum foi encontrado </p>)}
      </div>
    );
  }
}
