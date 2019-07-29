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
      volumeLevel: null,
      mute: false,
      trackDuration: ''
    };
    const audioCtx = window.AudioContext || window.webkitAudioContext;
    if (audioCtx) {
	  this.audioCtx = new audioCtx();
	  this.gainNode = this.audioCtx.createGain();
    } else {
      throw new Error("This environment does not support the web audio API.");
  }
  }
  playPauseAudio = evt => {
    evt.preventDefault();

    const audioElement = document.querySelector(".audio-file");
    const time = getDuration(audioElement.duration);


    this.setState({ trackDuration : time })

    if (!this.state.track) {
      this.track = this.audioCtx.createMediaElementSource(audioElement);
      this.setState({ track: true });
    }
    this.track.connect(this.gainNode).connect(this.audioCtx.destination);
    if (this.audioCtx.state === 'suspended') {
    	this.audioCtx.resume();
    }
    if (!this.state.isPlaying) {
      audioElement.play();
      this.setState({ isPlaying: true });
    } else {
      audioElement.pause();
      this.setState({ isPlaying: false });
    }

    // this.setState({
    //   isPlaying: true
    // })
  };

  changeVolume = evt => {
    evt.preventDefault();

	const volumeControl = document.querySelector('[data-action="volume"]');
  this.gainNode.gain.value = volumeControl.value;
  this.setState({volumeLevel: this.gainNode.gain.value})
  };

  muteSound = evt => {
  evt.preventDefault();
  // this.setState({mute: true})
  console.log(this.gainNode.gain.value)

  this.setState({volumeLevel : this.gainNode.gain.value}) 
	this.gainNode.gain.value = 0;

	if(this.state.volumeLevel)
	{
    this.gainNode.gain.value = this.state.volumeLevel;
	}	
  

  }

  render() {

    return (
      <div className='mp3-player-container'>
        <audio className="mp3-player-audio-file" src={audioMp3} crossOrigin="anonymous" />
        <div className='mp3-player-current-track'>
        <div className='mp3-player-current-img'>
        <img src='/favicon.ico' alt='podcast'/>
        </div>
        <div className='mp3-player-current-title'>
        <h3>This is the title</h3>
        <h4>This is the copy for the podcast were we have info</h4>
        </div>
        </div>
        <div className="mp3-player-track-container">
          <div className="mp3-player-control-buttons">
          <button className="mp3-player-tape-controls-backward">
          <Icon iconName="backward" />
          </button>
            <button className="mp3-player-tape-controls-play"
              onClick={evt => this.playPauseAudio(evt)}>

              {!this.state.isPlaying ? (
                <span className='mp3-player-play-button'><Icon iconName="play" /></span>
              ) : (
                <Icon iconName="pause" />
              )}
            </button>
            <button className="mp3-player-tape-controls-forward">
          <Icon iconName="forward" />
          </button>
          </div>

          <div className="mp3-player-control-track">
            <span>0:00 </span>
            <input
              type="range"
              min="0"
              max="20"
              className="mp3-player-control-track"
            />
            { this.state.trackDuration ? <span>{this.state.trackDuration}</span>
          : <span>0.00</span> }
          </div>
          </div>
          <div className='mp3-player-volume-container'>
          <div className='mp3-player-menu-buttons'>
          <button className="mp3-player-playlist-control">
          <Icon iconName="playlist" fill={"white"} />
          </button>
          <button className="mp3-player-hide-control">
          <Icon iconName="hide" fill={"white"} />
          </button>
          </div>
          <div className="mp3-player-volume-slider">
          <button className="mp3-player-tape-controls-mute"
              onClick={evt => this.muteSound(evt)}>
          {this.state.volumeLevel === 0 || this.state.mute === true ? <Icon iconName="mute" /> : <Icon iconName="volume" />}
		    </button>
            <input
              type="range"
              id="volume"
              className="mp3-player-control-volume"
              min="0"
              max="2"
              list="gain-vals"
              step="0.01"
              data-action="volume"
              onInput={evt => this.changeVolume(evt)}
            />
            <datalist id="gain-vals">
              <option value="0" label="min" />
              <option value="2" label="max" />
            </datalist>
          </div>
          </div>
      </div>
    );
  }
}
export default Player;
