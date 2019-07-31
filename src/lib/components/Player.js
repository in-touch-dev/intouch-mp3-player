import React from "react";
import Icon from "../icons/PlayerIcons";
import audioMp3 from "../audio/1-10.mp3";
import { formatTime } from "../helpers/playerHelper";
import { Howl } from 'howler';

class Player extends React.Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      track: false,
      trackDuration: 60,
      currentTime: 0,
      activeTrack: audioMp3,
      isHidden: false,
	  viewPlaylist: false,
	  volumeLevel : 1
    };

    this.progressRef = React.createRef();
  }

  setProgressIndicator = val =>
    (this.progressRef.current.querySelector(
      ".progress"
    ).style.width = `${val}px`);

  play(src) {
    if (this.state.currentTime === this.state.trackDuration) {
      return;
    }

    if (this.sound && this.state.isPaused) {
      this.sound.play();
      this.setState({ isPaused: false, isPlaying: true });
      return;
    }

    this.sound = new Howl({ src: [src] });
    this.sound.once("load", () => {
      this.sound.on("end", evt => {
        this.stopPlayLoop();
        this.setProgressIndicator(this.progressRef.current.clientWidth);
        this.setState({ currentTime: this.state.trackDuration });
      });

      this.sound.on("play", evt => {
        this.setState(
          {
            trackDuration: this.sound._duration,
            isPlaying: true,
            isPaused: false
          },
          () => this.playLoop()
        );
      });

      this.sound.play();
    });
  }

  pause() {
    this.sound.pause();
    this.stopPlayLoop();
    this.setState({ isPlaying: false, isPaused: true });
  }

  stopPlayLoop() {
    clearInterval(this.loop);
    this.loop = 0;
  }

  changeVolume = evt => {
	if( !this.sound ){ return };
    evt.preventDefault();
    const volumeControl = document.querySelector('[data-action="volume"]');
    if (volumeControl) {
	  this.sound.volume(volumeControl.value);
	  this.setState({ volumeLevel : volumeControl.value });
    }
  };

  muteSound = evt => {
	  if( !this.sound ){ return };
    evt.preventDefault();
    this.isMuted = !this.isMuted;
    this.sound.mute(this.isMuted);
	const volumeControl = document.querySelector('[data-action="volume"]');
	if (volumeControl) {
		this.setState({ volumeLevel : this.isMuted ? 0 : volumeControl.value });
	}
  };

  playPause() {
    if (!this.state.isPlaying) {
      return (
        <button
          className="mp3-player-tape-controls-play"
          onClick={() => this.play(this.state.activeTrack)}>
          <span className="mp3-player-play-button">
            <Icon iconName="play" />
          </span>
        </button>
      );
    }
    return (
      <button
        className="mp3-player-tape-controls-play"
        onClick={() => this.pause()} >
        <Icon iconName="pause" />
      </button>
    );
  }

  playLoop() {
    this.loop = setInterval(() => {
      let progressIndicator =
        (this.sound.seek() / this.state.trackDuration) *
        this.progressRef.current.clientWidth;
      this.setState({ currentTime: this.sound.seek(), progressIndicator }, () =>
        this.setProgressIndicator(progressIndicator)
      );
    }, 500);
  }

  progressClicked(evt) {
    if (!this.sound) {
      return;
    }

    this.pause();
    this.movementX =
      (evt.pageX || evt.clientX) -
      evt.currentTarget.getBoundingClientRect().left;

    this.setState(
      {
        currentTime:
          (this.movementX / this.progressRef.current.clientWidth) *
          this.state.trackDuration,
        progressIndicator: this.movementX
      },
      () => {
        this.setProgressIndicator(this.state.progressIndicator);
        this.sound.seek(this.state.currentTime);
        this.play();
      }
    );
  }

  viewPlaylistBox = evt => {
    evt.preventDefault();
    if (!this.state.viewPlaylist) this.setState({ viewPlaylist: true });
    else this.setState({ viewPlaylist: false });
  };

  playlistContent(){
	const playlist = this.props.tracks.map((track, key) => {
	  return (
		<button className='mp3-player-playlist-track-button' key={key} onClick={() => this.setActiveTrack(track)} >
		<h3 className='mp3-player-playlist-track-name'>{track.name}</h3>
		<h3 className='mp3-player-playlist-track-time'>0:00</h3>
		</button>
	  )
	})
	return playlist;
  }

  render() {
    const trackDuration = formatTime(this.state.trackDuration);
	const currentTime = formatTime(this.state.currentTime);
	const hideMp3 = this.state.isHidden ? 'hidden' : ''
    const showPlaylist = this.state.viewPlaylist ? 'playlist' : ''

    return (
      <div className={`mp3-player-container ${hideMp3} ${showPlaylist}`}>
        <div className="mp3-player-current-track">
          <div className="mp3-player-current-img">
            <img src="/favicon.ico" alt="podcast" />
          </div>
          <div className="mp3-player-current-title">
            <h3 className="mp3-player-current-name">This is the title</h3>
            <h4 className="mp3-player-current-copy">
              This is the copy for the podcast were we have info
            </h4>
          </div>
        </div>
        <div className="mp3-player-track-container">
          <div className="mp3-player-control-buttons">
            <button className="mp3-player-tape-controls-backward">
              <Icon iconName="backward" />
            </button>
            {this.playPause()}
            <button className="mp3-player-tape-controls-forward">
              <Icon iconName="forward" />
            </button>
          </div>
          <div className="mp3-player-control-track">
            <span className="mp3-player-track-elapsed">{currentTime}</span>
            <a
              href="#"
              ref={this.progressRef}
              className="progress-bar-wrap"
              onClick={evt => this.progressClicked(evt)} >
              <div className="progress" />
            </a>
            <span className="mp3-player-track-remaining">
                {trackDuration}
			</span>
          </div>
        </div>
        <div className="mp3-player-volume-container">
          <div className="mp3-player-menu-buttons">
            <button
              className="mp3-player-playlist-control"
              onClick={evt => this.viewPlaylistBox(evt)} >
              <Icon iconName="playlist" fill={"white"} />
            </button>
            <button
              className="mp3-player-hide-control"
              onClick={ () => this.setState({ isHidden: this.state.isHidden ? false : true }) } >
              <Icon iconName="hide" fill={"white"} />
            </button>
          </div>
          <div className="mp3-player-volume-slider">
            <button
              className="mp3-player-tape-controls-mute"
              onClick={evt => this.muteSound(evt)} >
              { <Icon iconName={ !this.state.volumeLevel ? "mute" : "volume" } /> }
            </button>
            <input
              type="range"
              id="volume"
              className="mp3-player-volume-input"
              min="0"
              max="2"
              list="gain-vals"
              step="0.01"
              data-action="volume"
              onInput={evt => this.changeVolume(evt)}
            />
          </div>
        </div>
        {this.state.viewPlaylist ? (
          <div className="mp3-player-playlist-container">
            <div className="mp3-player-playlist-header">
              <button
                className="mp3-player-playlist-close"
                onClick={evt => this.viewPlaylistBox(evt)} >
                <Icon iconName="close" fill={"white"} />
              </button>
            </div>
            <div className="mp3-player-playlist-content">
              {this.playlistContent()}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default Player;
