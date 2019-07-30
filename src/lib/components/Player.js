import React from "react";
import Icon from "../icons/PlayerIcons";
import audioMp3 from "../audio/belle.mp3";
import { getDuration } from "../helpers/playerHelper";

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
      track: false,
      volumeLevel: "",
      trackDuration: 1,
      currentTime: 0,
      viewPlaylist: false,
      activeTrack: "",
      isHidden: false
    };
    this.timerRef = React.createRef();
    this.timerRef = React.createRef();
    this.createAudioCtx();
  }

  createAudioCtx() {
    const audioCtx = window.AudioContext || window.webkitAudioContext;

    if (audioCtx) {
      this.audioCtx = new audioCtx();
      this.gainNode = this.audioCtx.createGain();
    } else {
      throw new Error("This environment does not support the web audio API.");
    }
  }

  componentWillMount() {
    this.setState({ activeTrack: audioMp3 });
    // let URL = this.props.tracks[0].src;
    // this.playAudioBuffer(URL);
  }

  //creates new buffer
  //connects up to audio context
  //gets total duration of track
  //if it isnt previously playing then will begin track
  //otherwise if is playing then resume
  play(audioBuffer, startAt) {
    if (this.state.currentTime === this.state.trackDuration) {
      return;
    }

    this.source = this.audioCtx.createBufferSource();
    this.source.buffer = audioBuffer;

    this.source.connect(this.gainNode).connect(this.audioCtx.destination);
    this.setState({ trackDuration: this.source.buffer.duration });

    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true });
      this.source.start(0, startAt || 0);
      // this.setState({ currentTime : startAt || 0 })
      this.playLoop();
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    this.source.onended = evt => {
      this.pause();
      this.stopPlayLoop();
    };
  }

  //pauses the audiobuffer
  pause() {
    if (this.audioCtx.state === "running") {
      this.setState({ isPlaying: false });
      this.audioCtx.suspend();
    }
  }

  playAudioBuffer(url) {
    const URL = url;
    window
      .fetch(URL)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => this.audioCtx.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        this.trackBuffer = audioBuffer;
        this.play(this.trackBuffer);
      });
  }

  pauseAudioBuffer = () => this.pause(this.trackBuffer);

  //regularly updates current time elapsed, ensure value doesnt exceed total track duration
  playLoop() {
    this.loop = setInterval(() => {
      let currentTime =
        this.audioCtx.currentTime > this.state.trackDuration
          ? this.state.trackDuration
          : Math.abs(this.audioCtx.currentTime - this.offset);
      //this.audioCtx.currentTime > this.state.currentTime ? this.audioCtx.currentTime + (+this.timerRef.current.value) :
      console.log(
        "-> playLoop() currentTime : ",
        this.offset,
        this.audioCtx.currentTime,
        currentTime
      );
      this.setState({ currentTime });
    }, 500);
  }

  //when track ends stop the interval updating this.state.currentTime
  stopPlayLoop() {
    clearInterval(this.loop);
    this.loop = 0;
  }

  //adjust gainnode value to change the volume levels
  changeVolume = evt => {
    evt.preventDefault();
    const volumeControl = document.querySelector('[data-action="volume"]');
    if (volumeControl) {
      this.gainNode.gain.value = volumeControl.value;
    }
  };

  //mute track
  muteSound = evt => {
    evt.preventDefault();

    this.setState({ volumeLevel: this.gainNode.gain.value });
    this.gainNode.gain.value = 0;

    if (this.state.volumeLevel) {
      this.gainNode.gain.value = this.state.volumeLevel;
    }
  };

  //When the timer value changes through the input slider we stop the audio source and recreate with the passed in
  //parameter of currenttime to begin playback at that moment
  changeFired = false;
  offset = 0;
  changeTimePosition(evt) {
    this.offset = this.audioCtx.currentTime;
    this.setState({ currentTime: this.timerRef.current.value });
    switch (evt.type) {
      case "mouseup":
        this.changeFired = false;
        this.play(this.trackBuffer, this.timerRef.current.value);
        break;
      case "change":
        if (this.changeFired) {
          return;
        }
        this.changeFired = true;
        this.source.stop(0);
        this.stopPlayLoop();
        break;
      default:
    }
  }

  setActiveTrack = track => {
    this.source.stop(0);
    this.setState({ activeTrack: track.src });
    console.log("what is active", this.state.activeTrack);
  };

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

  render() {
    const activeSrc = this.state.activeTrack;

    const trackDuration = getDuration(this.state.trackDuration);
    const currentTime = getDuration(this.state.currentTime);

    const hideMp3 = this.state.isHidden ? "hidden" : "";
    const showPlaylist = this.state.viewPlaylist ? "playlist" : "";

    return (
      <div className={`mp3-player-container ${hideMp3} ${showPlaylist}`}>
        <div className="mp3-player-current-track">
          <div className="mp3-player-current-img">
            <img src="/favicon.ico" alt="podcast" />
          </div>
          <div className="mp3-player-current-title">
            <h3 className="mp3-player-current-name">This is the title</h3>
            <p className="mp3-player-current-copy">
              This is the copy for the podcast were we have info
            </p>
          </div>
        </div>
        <div className="mp3-player-track-container">
          <div className="mp3-player-control-buttons">
            <button className="mp3-player-tape-controls-backward">
              <Icon iconName="backward" />
            </button>
            {!this.state.isPlaying ? (
              <button
                className="mp3-player-tape-controls-play"
                onClick={() => this.playAudioBuffer(activeSrc)}
              >
                <span className="mp3-player-play-button">
                  <Icon iconName="play" />
                </span>
              </button>
            ) : (
              <button
                className="mp3-player-tape-controls-play"
                onClick={() => this.pauseAudioBuffer(activeSrc)}
              >
                <Icon iconName="pause" />
              </button>
            )}
            <button className="mp3-player-tape-controls-forward">
              <Icon iconName="forward" />
            </button>
          </div>

          <div className="mp3-player-control-track">
            <span className="mp3-player-track-elapsed">{currentTime}</span>
            <input
              ref={this.timerRef}
              className="mp3-player-track-input"
              type="range"
              min="0"
              value={this.state.currentTime}
              max={this.state.trackDuration}
              onChange={evt => this.changeTimePosition(evt)}
              onMouseUp={evt => this.changeTimePosition(evt)}
              data-action="position"
              step="0.01"
            />
            {trackDuration ? (
              <span className="mp3-player-track-remaining">
                {trackDuration}
              </span>
            ) : (
              <span className="mp3-player-track-remaining">0:00</span>
            )}
          </div>
        </div>
        <div className="mp3-player-volume-container">
          <div className="mp3-player-menu-buttons">
            <button
              className="mp3-player-playlist-control"
              onClick={evt => this.viewPlaylistBox(evt)}
            >
              <Icon iconName="playlist" fill={"white"} />
            </button>
            <button
              className="mp3-player-hide-control"
              onClick={
                this.state.isHidden
									? () => this.setState({ isHidden: false, viewPlaylist: false })
                  : () => this.setState({ isHidden: true, viewPlaylist: false })
              }
            >
              <Icon iconName="hide" fill={"white"} />
            </button>
          </div>
          <div className="mp3-player-volume-slider">
            <button
              className="mp3-player-tape-controls-mute"
              onClick={evt => this.muteSound(evt)}
            >
              {this.state.volumeLevel === 0 ? (
                <Icon iconName="mute" />
              ) : (
                <Icon iconName="volume" />
              )}
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
        <div className="mp3-player-playlist-container">
          <div className="mp3-player-playlist-header">
            <button
              className="mp3-player-playlist-close"
              onClick={evt => this.viewPlaylistBox(evt)}
            >
              <Icon iconName="close" fill={"white"} />
            </button>
          </div>
          <ul className="mp3-player-playlist-content">
            {this.playlistContent()}
          </ul>
        </div>
      </div>
    );
  }
}
export default Player;
