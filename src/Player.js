import React from "react";
import Icon from "./icons/PlayerIcons";
import audioMp3 from "./audio/belle.mp3";
import { getDuration } from "./helpers/playerHelper";
class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
	  track: false,
      volumeLevel: '',
	  trackDuration: '',
	  currentTime: '' 
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
    console.log(time)


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
  };

  changeVolume = evt => {
    evt.preventDefault();

	const volumeControl = document.querySelector('[data-action="volume"]');
	this.gainNode.gain.value = volumeControl.value;
  };

  muteSound = evt => {
  	evt.preventDefault();

	this.setState({volumeLevel : this.gainNode.gain.value}) 
	this.gainNode.gain.value = 0;

	if(this.state.volumeLevel)
	{
		this.gainNode.gain.value = this.state.volumeLevel;
	}	
  };

  getElapsedTime() {
	const audioElement = document.querySelector(".audio-file");
	const formatTime = getDuration(audioElement.currentTime);
	this.setState({currentTime: formatTime});
	document.getElementById('time-elapsed').innerHTML = formatTime;
	};

  changeTimePosition = evt => {
	evt.preventDefault();
	// const positionControl = document.querySelector('[data-action="position"]');
	const audioElement = document.querySelector(".audio-file");
	console.log(audioElement.fastSeek(20))
  render() {

    return (
      <div className="container">
        <audio className="audio-file" src={audioMp3} crossOrigin="anonymous" onTimeUpdate={() => this.getElapsedTime()}/>
        <div className="current-track"/>
        <div className="track-container">
          <div className="control-buttons">
          <button className="tape-controls-backward">
          <Icon iconName="backward" fill={"#4D4D4D"} />
          </button>
            <button className="tape-controls-play"
              onClick={evt => this.playPauseAudio(evt)}>

              {!this.state.isPlaying ? (
                <Icon iconName="play" fill={"#4D4D4D"} />
              ) : (
                <Icon iconName="pause" fill={"#4D4D4D"} />
              )}
            </button>
            <button className="tape-controls-forward">
          <Icon iconName="forward" fill={"#4D4D4D"} />
          </button>
          </div>

          <div className="control-track">
		  <span id='time-elapsed' className="track-elapsed"/>
            <input
              type="range"
              min={this.state.currentTime}
			  max={this.state.trackDuration}
			  onInput={evt => this.changeTimePosition(evt)}
			  data-action="position"
			  step="0.01"
            />
            { this.state.trackDuration ? <span>{this.state.trackDuration}</span>
          : <span>0:00</span> }
          </div>
          </div>
          <div className="volume-container">
          <div className="volume-slider">
          <button className="tape-controls-mute"
              onClick={evt => this.muteSound(evt)}>
          <Icon iconName="mute" />
		    </button>
            <input
              type="range"
              id="volume"
              className="control-volume"
              min="0"
              max="2"
              list="gain-vals"
              step="0.01"
              data-action="volume"
              onInput={evt => this.changeVolume(evt)}
            />
          </div>
          <button className="playlist-control">
          <Icon iconName="playlist" fill={"#4D4D4D"} width={"24px"} />
          </button>
          </div>
      </div>
    );
  }
}
export default Player;
