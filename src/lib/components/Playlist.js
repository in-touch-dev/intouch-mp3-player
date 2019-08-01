  import React from 'react';
import Icon from "../icons/PlayerIcons";
import '../scss/App.scss';
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
              onClick={() => this.setActiveTrack(track)} >{track.name}
              <span className="mp3-player-playlist-track-time">0:00</span>
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
        this.setState({ activeTrack: track, showPlaylistBody: false
         });
      };

      playlistClickHandler( evt, overide ){
        this.setState({
          showPlaylistBody : typeof overide !== "undefined" ? overide : !this.state.showPlaylistBody
        })
      }

      playlistBody(){
        if( this.state.hidePlaylist ){ return };
        const showPlaylist = this.state.showPlaylistBody ? "playlist" : "";
        return (
          <div className={`mp3-player-playlist-container ${showPlaylist}`}>
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
    
    togglePlaylist( condition ){
      const state = { hidePlaylist : condition };

      if( condition ){
        state.showPlaylistBody = false;
      }
      this.setState( state );
    }

    render(){
        return (
            <div className="playlist-wrap">
                <Player
                  activeTrack={ this.state.activeTrack }
                  hasPlaylist={ true }
                  playlistClickHandler={ evt => this.playlistClickHandler( evt ) }
                  skipHandler={ (evt, type) => this.skipHandler( evt, type ) }
                  togglePlaylist={ condition => this.togglePlaylist( condition ) } />
                { this.playlistBody() }
            </div>
        );
    }
};

module.exports = Playlist;