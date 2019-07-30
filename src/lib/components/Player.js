import React from "react";
import Icon from "../icons/PlayerIcons";
import audioMp3 from "../audio/1-10.mp3";
import { getDuration } from "../helpers/playerHelper";
import { Howl } from 'howler';

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

	componentWillMount = () => this.setState({ activeTrack : audioMp3 })

	setProgressIndicator = val => this.progressRef.current.querySelector( '.progress' ).style.width = `${ val }px`

	play( src ){
		if( this.state.currentTime === this.state.trackDuration ){ return };

		if( this.sound && this.state.isPaused ){
			this.sound.play();
			this.setState({ isPaused : true });
			return;
		};

		this.sound = new Howl({ src : [ src ] });
		this.sound.once( 'load', () => { 

			this.sound.on( 'end', evt => {
				this.stopPlayLoop();
				this.setProgressIndicator( this.progressRef.current.clientWidth );
				this.setState({ currentTime : this.state.trackDuration });
			});

			this.sound.on( 'play', evt => {
				this.setState({
					trackDuration : this.sound._duration,
					isPlaying : true,
					isPaused : false
				}, () => this.playLoop());
			});

			this.sound.play();

		});
	}

	pause(){
		this.sound.pause();
		this.stopPlayLoop();
		this.setState({ isPlaying : false, isPaused : true });
	}

	stopPlayLoop() {
		clearInterval( this.loop );
		this.loop = 0;
	}

	changeVolume = evt => {
		evt.preventDefault();
		const volumeControl = document.querySelector('[data-action="volume"]');
		if( volumeControl ){ this.sound.volume( volumeControl.value ) };
	};

	muteSound = evt => {
		evt.preventDefault();
		this.isMuted = !this.isMuted;
		this.sound.mute( this.isMuted );
	};

	playPause(){
		if( !this.state.isPlaying ){
			return (
				<button className="tape-controls-play" onClick={ () => this.play( this.state.activeTrack ) }>
					<span className='play-button'><Icon iconName="play" /></span>
				</button>
			);
		};
		return (
			<button className="tape-controls-play" onClick={ () => this.pause() }>
				<span className='pause-button'><Icon iconName="pause" /></span>
			</button>
		);
	}


	playLoop() {
		this.loop = setInterval(() => {
			let progressIndicator = this.sound.seek() / this.state.trackDuration * this.progressRef.current.clientWidth;
			this.setState({ currentTime : this.sound.seek(), progressIndicator }, () => this.setProgressIndicator( progressIndicator ));
		}, 500);
	}

	progressClicked( evt ){
		if( !this.sound ){ return };

		this.pause();
		this.movementX = (evt.pageX || evt.clientX) - evt.currentTarget.getBoundingClientRect().left;

		this.setState({
			currentTime : this.movementX / this.progressRef.current.clientWidth * this.state.trackDuration,
			progressIndicator : this.movementX
		}, () => {
			this.setProgressIndicator( this.state.progressIndicator );
			this.sound.seek( this.state.currentTime );
			this.play();
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
							max="1"
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
