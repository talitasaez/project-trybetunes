import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  state = {
    musics: [],
    artist: '',
    album: '',
  };

  componentDidMount() {
    this.getMusicsApi();
  }

  getMusicsApi = async () => {
    const { match: { params: { id } } } = this.props;
    const song = await getMusics(id);
    console.log(song);
    this.setState({
      musics: song,
      artist: song[0].artistName,
      album: song[0].collectionName,
    });
  };

  render() {
    const { musics, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artist }</p>
        <p data-testid="album-name">{ album }</p>
        {musics.filter((music, index) => index !== 0)
          .map((music) => (
            <MusicCard
              key={ music.collectionId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              objectMusic={ music }
              trackId={ music.trackId }
            />
          ))}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
