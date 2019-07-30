import React from "react";
import Icon from "../icons/PlayerIcons";
import audioMp3 from "../audio/1-10.mp3";
import { getDuration } from "../helpers/playerHelper";

class Player extends React.Component {
	constructor() {
		super();

		this.state = {
			isPlaying: false,
			track: false,
			volumeLevel: '',
			trackDuration: 60,
			currentTime: 0,
			viewPlaylist: false,
			activeTrack: ''
		};

		const audioCtx = window.AudioContext || window.webkitAudioContext;
		
		if( audioCtx ){
			this.audioCtx = new audioCtx();
			this.gainNode = this.audioCtx.createGain();
		}else{ throw new Error("This environment does not support the web audio API.") };

		this.progressRef = React.createRef();

	}

	componentWillMount() {
		this.setState({ activeTrack: audioMp3 })
		// let URL = this.props.tracks[0].src;
		// this.playAudioBuffer(URL);
	}





	play( startingAt ){
		// console.log( "1.) play() >> startingAt : ", startingAt );
		if (this.state.currentTime === this.state.trackDuration) { return; };
		// console.log( "2.) play() >> startingAt : ", startingAt );

		this.source = this.audioCtx.createBufferSource();
		this.source.buffer = this.audioBuffer;

		this.source.connect(this.gainNode).connect(this.audioCtx.destination);
		this.setState({ trackDuration: this.source.buffer.duration });

		if (!this.state.isPlaying) {
			this.setState({ isPlaying: true });
			this.source.start( 0, startingAt || 0 );
			this.playLoop();
		};

		if (this.audioCtx.state === "suspended") {
			this.audioCtx.resume();
			// console.log("issuspended ", this.audioCtx.state);
		};

		this.source.onended = evt => {
			this.pause();
			this.stopPlayLoop();
			// console.log('onended()')
		};

	}






	pause() {
		if (this.audioCtx.state === 'running') {
			this.setState({ isPlaying: false });
			this.audioCtx.suspend();
			this.stopPlayLoop();
			// console.log('running', this.audioCtx.state);
		}
	}

	playAudioBuffer( url, startingAt ){
		fetch( url )
			.then( response => response.arrayBuffer() )
			.then( arrayBuffer => this.audioCtx.decodeAudioData( arrayBuffer ) )
			.then( audioBuffer => {
				this.audioBuffer = audioBuffer;
				this.play( startingAt );
			})
			.catch( console.error );
	}

	stopPlayLoop() {
		clearInterval(this.loop);
		this.loop = 0;
	}

	pauseAudioBuffer = () => this.pause( this.trackBuffer )

	changeVolume = evt => {
		evt.preventDefault();
		const volumeControl = document.querySelector('[data-action="volume"]');
		if( volumeControl ){ this.gainNode.gain.value = volumeControl.value };
	};

	muteSound = evt => {
		evt.preventDefault();

		this.setState({ volumeLevel: this.gainNode.gain.value });
		this.gainNode.gain.value = 0;
		if( this.state.volumeLevel ){ this.gainNode.gain.value = this.state.volumeLevel };
	};

	playPause(){
		if( !this.state.isPlaying ){
			return (
				<button className="tape-controls-play" onClick={() => this.playAudioBuffer( this.state.activeTrack )}>
					<span className='play-button'><Icon iconName="play" /></span>
				</button>
			);
		};
		return (
			<button className="tape-controls-play" onClick={() => this.pauseAudioBuffer( this.state.activeTrack )}>
				<span className='pause-button'><Icon iconName="pause" /></span>
			</button>
		);
	}

	playLoop() {
		this.loop = setInterval(() => {

			let currentTime = this.audioCtx.currentTime;// > this.state.trackDuration ? this.state.trackDuration : this.audioCtx.currentTime;
			let progressIndicator = this.audioCtx.currentTime / this.state.trackDuration * this.progressRef.current.clientWidth;
			this.progressRef.current.querySelector( '.progress' ).style.width = `${ progressIndicator }px`;
			this.setState({ currentTime, progressIndicator });

		}, 500);
	}


	progressClicked( evt ){

		this.pause();
		this.stopPlayLoop();
		this.source.stop(0);
		this.source.disconnect();
		this.gainNode.disconnect();
		this.audioCtx.destination.disconnect();
		console.log(this.audioCtx);

		this.movementX = (evt.pageX || evt.clientX) - evt.currentTarget.getBoundingClientRect().left;

		this.setState({
			currentTime : this.movementX / this.progressRef.current.clientWidth * this.state.trackDuration,
			progressIndicator : this.movementX
		}, () => {

			this.progressRef.current.querySelector( '.progress' ).style.width = `${ this.state.progressIndicator }px`;
			this.play( this.state.currentTime );

		});
	}

	render() {
		const trackDuration = getDuration( this.state.trackDuration );
		const currentTime = getDuration( this.state.currentTime );

		return (
			<div className="container">
				<div className="current-track"></div>
				<div className="track-container">
					<div className="control-buttons">
						<button className="tape-controls-backward">
							<Icon iconName="backward" />
						</button>
						{ this.playPause() }
						<button className="tape-controls-forward">
							<Icon iconName="forward" />
						</button>
					</div>
					<div className="control-track">
						<span id='time-elapsed' className="track-elapsed" />
						<span>{ currentTime }</span>
						<a href="#" ref={ this.progressRef } className="progress-bar-wrap" onClick={ evt => this.progressClicked( evt ) }>
							<div className="progress"></div>
						</a>
						{ trackDuration ? <span>{ trackDuration }</span> : <span>0:00</span> }
					</div>
				</div>
				<div className='volume-container'>
					<div className='menu-buttons'>
						<Icon iconName="playlist" fill={"white"} width={"28px"} />
						<button className="playlist-control">
							<Icon iconName="hide" fill={"white"} width={"28px"} />
						</button>
					</div>
					<div className="volume-slider">
						<button className="tape-controls-mute" onClick={ evt => this.muteSound( evt ) }>
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
							onInput={ evt => this.changeVolume( evt ) } />
					</div>
				</div>
			</div>
		);
	}
};

export default Player;
