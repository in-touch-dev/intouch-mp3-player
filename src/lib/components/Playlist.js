  import React from 'react';
import Icon from "../icons/PlayerIcons";
import Player from './Player';

class Playlist extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
		  currentIndex : this.props.currentIndex || 0,
          activeTrack: this.props.tracks[ (this.props.currentIndex || 0) ]
      }
    }

    viewPlaylistBox = evt => {
        evt.preventDefault();
        if (!this.state.viewPlaylist) this.setState({ viewPlaylist: true });
        else this.setState({ viewPlaylist: false });
      };
    
      playlistContent() {
        const playlist = this.props.tracks.map((track, key) => {
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
        if (track.src === this.state.activeTrack) {
          return;
        }
        if ( window.audio && window.audio.active) {
			window.audio.active.pause();
        }
        this.setState({ activeTrack: track });
      };

      playlistClickHandler( evt ){
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
                onClick={evt => this.playlistClickHandler(evt)}
              >
                <Icon iconName="close" fill={"white"} />
              </button>
            </div>
            <div className="mp3-player-playlist-content">
              {this.playlistContent()}
            </div>
          </div>
        );
	  }
	  
	  skipHandler( evt, type ){

		const newIndex = type === 'next' ? this.state.currentIndex + 1 : this.state.currentIndex - 1;

		if( typeof this.props.tracks[ newIndex ] !== "undefined" ){
			this.setState({
				currentIndex : newIndex,
				activeTrack : this.props.tracks[ newIndex ]
			});
			return;
		};

		console.error("no song to play!");

	  }

    render(){
        return (
            <div className="playlist-wrap">
                <Player
					activeTrack={ this.state.activeTrack }
					hasPlaylist={ true }
					playlistClickHandler={ evt => this.playlistClickHandler( evt ) }
					skipHandler={ (evt, type) => this.skipHandler( evt, type ) } />
                { this.playlistBody() }
            </div>
        );
    }
};

export default Playlist;