import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css'

export class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.onNameChange = this.onNameChange.bind(this);
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }
  render() {
  return(
    <div className="Playlist">
      <input defaultValue={'New Playlist'} onChange={this.props.handleNameChange} />
      <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
      <a className="Playlist-save">SAVE TO SPOTIFY onClick={this.props.onSave}</a>
    </div>
  )
  }
}

export default Playlist;
