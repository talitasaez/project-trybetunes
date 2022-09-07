import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  //   componentDidMount() {
  //     this.favoriteMusic();
  //   }

  //   favoriteMusic = async () => {
  //     const { trackId } = this.props;
  //     this.setState({ loading: true });
  //     const getFavorite = await getFavoriteSongs();
  //     const list = getFavorite.some({ music } = music.trackId === trackId);
  //     this.setState({ loading: false, checked: list });
  //   };

  handleChecked = ({ target }) => {
    const ischecked = target.checked;
    this.setState({ loading: true, checked: ischecked }, async () => {
      const { objectMusic } = this.props;
      await addSong(objectMusic);
      this.setState({ loading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        { loading ? (
          <Loading />
        ) : (
          <div>
            <h1>{ trackName }</h1>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                checked={ checked }
                onChange={ this.handleChecked }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
