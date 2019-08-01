  import React from 'react';
import Icon from "../icons/PlayerIcons";
import Player from './Player';

class Playlist extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          activeTrack: this.props.tracks[0]
      }
    }

    viewPlaylistBox = evt => {
        evt.preventDefault();
        if (!this.state.viewPlaylist) this.setState({ viewPlaylist: true });
        else this.setState({ viewPlaylist: false });
      };
    
      playlistContent() {
        const playlist = this.props.tracks.map((track, key) => {

          console.log(track);
          return (
            <button
              className="mp3-player-playlist-track-button"
              key={key}
              onClick={() => this.setActiveTrack(track)} >
              <h3 className="mp3-player-playlist-track-name">{track.name}</h3>
              <h3 className="mp3-player-playlist-track-time">0:00</h3>
            </button>
          );
        });
        return playlist;
      }

      setActiveTrack = track => {
        console.log(track, this.state);
        if (track.src === this.state.activeTrack) {
          return;
        }
        if ( window.audio && window.audio.active) {
			window.audio.active.pause();
        }
        this.setState({ activeTrack: track });
        console.log("what is active", this.state.activeTrack);
      };

      playlistClickHandler( evt ){
        console.log('playlistClickHandler()', evt, this);
        this.setState({
          showPlaylistBody : !this.state.showPlaylistBody
        })
      }

      playlistBody(){
        if( !this.state.showPlaylistBody ){ return };
        return (
          <div className="mp3-player-playlist-container">
                    <div className="mp3-player-playlist-header">
                    <button
                        className="mp3-player-playlist-close"
                        onClick={evt => this.playlistClickHandler(evt)} >
                        <Icon iconName="close" fill={"white"} />
                    </button>
                    </div>
                    <div className="mp3-player-playlist-content">
                    { this.playlistContent() }
                    </div>
                </div>
        );
      }

    render(){
        return (
            <div className="playlist-wrap">
                <Player activeTrack={ this.state.activeTrack } hasPlaylist={ true } playlistClickHandler={ evt => this.playlistClickHandler( evt ) } />
                { this.playlistBody() }
            </div>
        );
    }
};

export default Playlist;