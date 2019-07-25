import React from "react";
import Icon from "../icons/PlayerIcons";
// import audioMp3 from "../audio/belle.mp3";
import { getDuration } from "../helpers/playerHelper";

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
	    track: false,
      volumeLevel: '',
	    trackDuration: 1,
      currentTime: 0,
      viewPlaylist: false,
      activeTrack: ''
    };
    const audioCtx = window.AudioContext || window.webkitAudioContext;
    if (audioCtx) {
	  this.audioCtx = new audioCtx();
	  this.gainNode = this.audioCtx.createGain();
    } else {
      throw new Error("This environment does not support the web audio API.");
  }
  }

  componentWillMount(){
    this.setState({ activeTrack: this.props.tracks[0].src })
    // let URL = this.props.tracks[0].src;
    // this.playAudioBuffer(URL);
  }

  play(audioBuffer){
    if( this.state.currentTime === this.state.trackDuration ){ return; };
  
    const source = this.audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    source.connect(this.gainNode).connect(this.audioCtx.destination);
    this.setState({ trackDuration : source.buffer.duration });

    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true });
      source.start(0);
      this.playLoop();
    };

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
      console.log("issuspended ", this.audioCtx.state);
    };

    console.log(source);

    source.onended = evt => {
      this.pause();
      this.stopPlayLoop();
      this.setState({ currentTime : source.buffer.duration });
      console.log('source.stop() source.onended : ', arguments)
    };

  }

  pause(){
    if (this.audioCtx.state === 'running'){
      this.setState({ isPlaying: false });
        this.audioCtx.suspend();
        console.log('running', this.audioCtx.state);
    }
  }

  playAudioBuffer(url) {
    const URL = url
    let trackBuffer;
    window.fetch(URL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => this.audioCtx.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          trackBuffer = audioBuffer;
          this.play(trackBuffer);
        });
        
  }



  playLoop(){
    this.loop = setInterval(() => {

      let currentTime = this.audioCtx.currentTime > this.state.trackDuration ? this.state.trackDuration : this.audioCtx.currentTime ;
      this.setState({ currentTime });

    }, 500);
  }

  stopPlayLoop(){
    clearInterval( this.loop );
    this.loop = 0;
  }





  pauseAudioBuffer = () => this.pause(this.trackBuffer)

  changeVolume = evt => {
    evt.preventDefault();
    const volumeControl = document.querySelector('[data-action="volume"]');
    if( volumeControl ){ this.gainNode.gain.value = volumeControl.value };
  };

  muteSound = evt => {
  	evt.preventDefault();

    this.setState({ volumeLevel: this.gainNode.gain.value });
    this.gainNode.gain.value = 0;

    if (this.state.volumeLevel) {
      this.gainNode.gain.value = this.state.volumeLevel;
    }	
  };

  // changeTimePosition() {
  //   this.audioCtx.context.currentTime()
  //   console.log()
  // }

  // viewPlaylistBox = evt =>{
  //   evt.preventDefault();
  //   if(!this.state.viewPlaylist)
  //     this.setState({ viewPlaylist: true})
  //   else
  //   this.setState({ viewPlaylist: false})
  // }
  // playlistContent(){
  //   const playlist = this.props.tracks.map((track, key) => {
  //     return (
  //       <button className='playlist-track-button' key={key}>
  //       <p>{track.name}</p>
  //       </button>
  //     )
  //   })
  //   return playlist;
  // }


  
  render() {

    const activeSrc = this.state.activeTrack;
    console.log(activeSrc);

    const trackDuration = getDuration( this.state.trackDuration );
    const currentTime = getDuration( this.state.currentTime );

    return (
      <div className="container">
        <div className="current-track"/>
        <div className="track-container">
          <div className="control-buttons">
          <button className="tape-controls-backward">
          <Icon iconName="backward" />
          </button>

              {!this.state.isPlaying ? (
                 <button className="tape-controls-play"
                 onClick={() => this.playAudioBuffer(activeSrc)}>
                <span className='play-button'><Icon iconName="play" /></span>
                </button>
              ) : (
                <button className="tape-controls-play"
                 onClick={() => this.pauseAudioBuffer(activeSrc)}>
                <span className='pause-button'><Icon iconName="pause"/></span>
                </button>
                
              )}

            <button className="tape-controls-forward">
          <Icon iconName="forward" />
          </button>
          </div>

          <div className="control-track">
		      <span id='time-elapsed' className="track-elapsed"/>
          <span>{ currentTime }</span>
            <input
              type="range"
              min={ 0 }
			  max={ trackDuration }
        onInput={() => this.changeTimePosition()}
			  data-action="position"
			  step="0.01"
            />
            { trackDuration ? <span>{ trackDuration }</span>
          : <span>0:00</span> }
          </div>
          </div>
          <div className='volume-container'>
          <div className='menu-buttons'>
          {/* <button className="playlist-control" onClick={evt => this.viewPlaylistBox(evt)}> */}
          <Icon iconName="playlist" fill={"white"} width={"28px"} />
          {/* </button> */}
          <button className="playlist-control">
          <Icon iconName="hide" fill={"white"} width={"28px"} />
          </button>
          </div>
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
          </div>
          {/* { this.state.viewPlaylist ? 
          this.playlistContent()
          :
          null */}
          }
      </div>
    );
  }
}
export default Player;
