import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistTracks: [],
      playlistName: 'Testing',
      searchResults: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    }

  addTrack(track) {
    if (this.state.playlistTracks.every(plTrack => plTrack.id !== track.id)) {
    let newPlaylistTracks = this.state.playlistTracks.concat(track);
    this.setState({playlistTracks: newPlaylistTracks});
  }
    }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(plTrack =>
    plTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylistTracks});
    }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(
      this.setState({playlistName: 'New Playlist', playlistTracks: []})
    )
    }



  search(term) {
    Spotify.search(term).then(tracks =>
      this.setState({searchResults: tracks}));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.state.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack()} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
