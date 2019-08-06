import React from "react";
import Icon from "../icons/PlayerIcons";
import "../scss/App.scss";
import Player from "./Player";

// const React = require('react');
// const Icon = require('../icons/PlayerIcons');
// require('../scss/App.scss')
// const Player = require('./Player');

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: this.props.currentIndex || 0,
      activeTrack: this.props.tracks[this.props.currentIndex || 0],
      isMobile: false
    };
  }

  componentWillMount() {
	  let bp
	  if(this.props.opts) {
	   bp = this.props.opts.breakpoint ? (Math.abs( this.props.opts.breakpoint.maxWidth + (this.props.opts.offset && this.props.opts.offset.left ? this.props.opts.offset.left : 0) + (this.props.opts.offset && this.props.opts.offset.right ? this.props.opts.offset.right : 0))) : 768
	  } else {
		  bp = 768
	  }
	
    this.breakpoint = window.matchMedia(
      `(max-width: ${ bp }px)`
    );
    const breakpointHandler = () => {
      this.setState({ isMobile: this.breakpoint.matches });
    };

	this.breakpoint.addListener(breakpointHandler);
	breakpointHandler();
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
          onClick={() => this.setActiveTrack(track)}
        >
          {track.name}
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
    if (window.audio && window.audio.active) {
      window.audio.active.pause();
    }
    this.setState({ activeTrack: track, showPlaylistBody: false });
  };

  playlistClickHandler(evt, overide) {
    this.setState({
      showPlaylistBody:
        typeof overide !== "undefined" ? overide : !this.state.showPlaylistBody
    });
  }

  playlistBody() {
    if (this.state.hidePlaylist) {
      return;
    }
	const showPlaylist = this.state.showPlaylistBody ? "playlist" : "";
  const isMobile = this.state.isMobile ? 'is-mobile' : '';

    const styleOffsetOverides = Object.assign( {}, { left : 0, right : 0 }, this.props.opts && this.props.opts.offset );
    styleOffsetOverides.left = `${ styleOffsetOverides.left }px`;
    styleOffsetOverides.right = `${ styleOffsetOverides.right }px`;

    return (
      <div className={`mp3-player-playlist-container ${showPlaylist} ${isMobile}`} style={ this.state.isMobile ? styleOffsetOverides : {} }>
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

  skipHandler(evt, type) {
    const newIndex =
      type === "next"
        ? this.state.currentIndex + 1
        : this.state.currentIndex - 1;

    if (typeof this.props.tracks[newIndex] !== "undefined") {
      this.setState({
        currentIndex: newIndex,
        activeTrack: this.props.tracks[newIndex]
      });
      return;
    }

    console.error("no song to play!");
  }

  togglePlaylist(condition) {
    const state = { hidePlaylist: condition };

    if (condition) {
      state.showPlaylistBody = false;
    }
    this.setState(state);
  }

  render() {
    return (
      <div className={ this.state.isMobile ? "playlist-wrap is-mobile" : "playlist-wrap" }>
        <Player
          activeTrack={this.state.activeTrack}
          hasPlaylist={true}
          playlistClickHandler={evt => this.playlistClickHandler(evt)}
          skipHandler={(evt, type) => this.skipHandler(evt, type)}
          togglePlaylist={condition => this.togglePlaylist(condition)}
		  isMobile={this.state.isMobile}
		  opts={ this.props.opts }
        />
        {this.playlistBody()}
      </div>
    );
  }
}
