import React from "react";
import Icon from "./icons/PlayerIcons";
import audioMp3 from "./audio/belle.mp3";

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
	  track: false,
	  volumeLevel: ''
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
	console.log(volumeControl.value);
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
	

  }

  render() {
    return (
      <div className="container">
        <audio className="audio-file" src={audioMp3} crossOrigin="anonymous" />
        <div className='current-track'/>
        <div className="track-container">
          <div className="control-buttons">
          <button className="tape-controls-backward">
          <Icon iconName="backward" fill={"#4D4D4D"} width={"30px"} />
          </button>
            <button className="tape-controls-play"
              onClick={evt => this.playPauseAudio(evt)}>

              {!this.state.isPlaying ? (
                <Icon iconName="play" fill={"#4D4D4D"} width={"50px"} />
              ) : (
                <Icon iconName="pause" fill={"#4D4D4D"} width={"50px"} />
              )}
            </button>
            <button className="tape-controls-forward">
          <Icon iconName="forward" fill={"#4D4D4D"} width={"30px"} />
          </button>
          </div>

          <div className="track-slider">
            <input
              type="range"
              className="control-track"
            />
          </div>
          </div>


          <div className='volume-container'>
          <button className="tape-controls-mute"
              onClick={evt => this.muteSound(evt)}>
          <Icon iconName="mute" fill={"#4D4D4D"} width={"20px"} onClick={evt => this.muteSound(evt)}/>
		    </button>
          <div className="volume-slider">
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
            <datalist id="gain-vals">
              <option value="0" label="min" />
              <option value="2" label="max" />
            </datalist>
          </div>
          <button className="playlist-control">
          <Icon iconName="playlist" fill={"#4D4D4D"} width={"25px"} />
          </button>
          </div>
      </div>
    );
  }
}
export default Player;
