import "../scss/app.css";
import React from "react";
import Icon from "../icons/PlayerIcons";
import formatTime from "../helpers/playerHelper";
import { Howl } from "howler";

export default class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.defaultState();
		this.progressRef = React.createRef();
	}

	componentWillMount = () => {
		this.calculateOffset();

		if (!this.props.activeTrack) { return; }
		this.play();
	}

	calculateOffset() {
		this.wrapOffsetStyles = {
			left: "0",
			right: "0"
		};

		this.wrapOffsetStyles = Object.assign(
			{},
			this.wrapOffsetStyles,
			this.props.opts && this.props.opts.offset
		);

		this.wrapOffsetStyles.left = `${this.wrapOffsetStyles.left}px`;
		this.wrapOffsetStyles.right = `${this.wrapOffsetStyles.right}px`;
	}

	defaultState() {
		return {
			isPlaying: false,
			track: false,
			trackDuration: 0,
			currentTime: 0,
			isHidden: false,
			volumeLevel: 1,
			currentIndex: 1,
			closed: false,
			loading: false,
			isAutoStopped: false
		};
	}

	reset() {
		if (!this.sound) {
			return;
		}
		this.stopPlayLoop();
		this.sound.pause();
		this.sound = null;
		window.audio.active = null;
		this.setProgressIndicator(0);
		this.setState(this.defaultState());
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.activeTrack.src !== nextProps.activeTrack.src) {
			if (window.audio && window.audio.active) {
				window.audio.active.pause();
			}
			this.reset();
			this.sound && this.sound.stop();
			this.sound && this.sound.unload();
		}
		return true;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.activeTrack.src !== this.props.activeTrack.src) {
			this.play();
		}
		this.calculateOffset();
	}

	setProgressIndicator = val => this.progressRef.current && (this.progressRef.current.querySelector( ".progress" ).style.marginLeft = `${val}px`)

	play() {
		if (this.sound && this.state.isPaused) {
			this.sound.play();
			this.setState({
				isPaused: false,
				isPlaying: true,
				isAutoStopped: false
			});
			return;
		}

		this.sound = new Howl({ src: [this.props.activeTrack.src], html5: true });
		window.audio = { active: this.sound };

		this.setState({
			loading: true,
			autoStopAt: this.props.activeTrack.autoStopAt || [],
			isAutoStopped: false
		});
		this.sound.once("load", () => {
			this.setState({ loading: false });
			this.sound.on("end", evt => {
				this.stopPlayLoop();
				this.setProgressIndicator(this.progressRef.current.clientWidth);
				this.setState({
					currentTime: this.state.trackDuration,
					isPlaying: false,
					isPaused: true
				});
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

	closePlayer() {
		this.sound && this.sound.stop();
		this.setState({ closed: true }, () => {
			this.props.onClose instanceof Function && this.props.onClose();
		});
	}

	changeVolume = evt => {
		if (!this.sound) {
			return;
		}
		evt.preventDefault();
		const volumeControl = document.querySelector('[data-action="volume"]');
		if (volumeControl) {
			this.sound.volume(volumeControl.value);
			this.setState({ volumeLevel: volumeControl.value });
		}
	};

	muteSound = evt => {
		if (!this.sound) {
			return;
		}
		evt.preventDefault();
		this.isMuted = !this.isMuted;
		this.sound.mute(this.isMuted);
		const volumeControl = document.querySelector('[data-action="volume"]');
		if (volumeControl) {
			this.setState({ volumeLevel: this.isMuted ? 0 : volumeControl.value });
		}
	};

	playPause() {
		if (this.state.loading) {
			return (
				<button className="mp3-player-tape-controls-play">
					<div className="mp3-player-loading-container">
						<div className="item-1" />
						<div className="item-2" />
						<div className="item-3" />
						<div className="item-4" />
						<div className="item-5" />
					</div>
				</button>
			);
		} else {
			if (!this.state.isPlaying) {
				return (
					<button
						className="mp3-player-tape-controls-play"
						onClick={() => this.play()}
					>
						<span className="mp3-player-play-button">
							<Icon iconName="play" />
						</span>
					</button>
				);
			}
			return (
				<button
					className="mp3-player-tape-controls-play"
					onClick={() => this.pause()}
				>
					<Icon iconName="pause" />
				</button>
			);
		}
	}

	playLoop() {
		if (!this.state.closed) {
			this.loop = setInterval(() => {
				this.progressWidth = this.progressRef.current && this.progressRef.current.clientWidth ? this.progressRef.current.clientWidth : this.progressWidth ;
				let progressIndicator = (~~(this.sound.seek()) / this.state.trackDuration) * this.progressWidth;
				let {autoStopAt, isAutoStopped} = this.state;
				if (!!autoStopAt && autoStopAt.length > 0 && this.sound.seek() >= autoStopAt[0]) {
					console && console.log(`Auto pause at ${autoStopAt[0]} (${this.sound.seek()})...`)
					this.pause();
					isAutoStopped = true;
					autoStopAt = [...autoStopAt];
					autoStopAt.shift();
				} else {
					isAutoStopped = false;
				}
				this.setState(
					{
						currentTime: this.sound.seek(),
						progressIndicator,
						autoStopAt,
						isAutoStopped
					},
					() => this.setProgressIndicator( progressIndicator )
				);

			}, 10);
		}
	}

	progressClicked(evt) {
		if( !this.sound ){ return };

		this.pause();
		this.movementX = (evt.pageX || evt.clientX) - evt.currentTarget.getBoundingClientRect().left;

		this.setState(
			{
				currentTime: ((this.movementX / this.progressRef.current.clientWidth) * this.state.trackDuration),
				progressIndicator: this.movementX
			},
			() => {
				this.setProgressIndicator(this.state.progressIndicator);
				this.sound.seek(this.state.currentTime);
				this.play();
			}
		);
	}

	render() {
		const trackDuration = formatTime(this.state.trackDuration);
		const currentTime = formatTime(this.state.currentTime);
		const hideMp3 = this.state.isHidden ? "mp3-player-hidden" : "";
		const isMobile = this.props.isMobile ? "is-mobile" : "";
		const { closed, isAutoStopped } = this.state;

		if (closed) {
			return null;
		} else {
			return (
				<div
					className={`mp3-player-container ${hideMp3} ${isMobile}`}
					style={this.wrapOffsetStyles}
				>
					<div className="mp3-player-current-track">
						<div
							className="mp3-player-current-img"
							style={{
								backgroundImage: `url( ${
									this.props.activeTrack.img
										? this.props.activeTrack.img
										: "https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg"
									} )`,
								mixBlendMode: isAutoStopped ? 'color-dodge': 'normal'
							}}
						/>
						<div className="mp3-player-current-title">
							<p className="mp3-player-current-name">
								{this.props.activeTrack.name}
							</p>
							<p className="mp3-player-current-copy">
								{this.props.activeTrack.desc}
							</p>
						</div>
					</div>
					<div className="mp3-player-track-container">
						<div className="mp3-player-control-buttons">
							{this.props.hasPlaylist && (
								<button
									className="mp3-player-tape-controls-backward"
									onClick={evt => this.props.skipHandler(evt, "prev")}
								>
									<Icon iconName="backward" />
								</button>
							)}
							{this.playPause()}
							{this.props.hasPlaylist && (
								<button
									className="mp3-player-tape-controls-forward"
									onClick={evt => this.props.skipHandler(evt, "next")}
								>
									<Icon iconName="forward" />
								</button>
							)}
						</div>
						<div className="mp3-player-control-track">
							<span className="mp3-player-track-elapsed">{currentTime}</span>
							<div
								ref={this.progressRef}
								className="progress-bar-wrap"
								onClick={evt => this.progressClicked(evt)}
							>
								<div className="progress" />
							</div>
							<span className="mp3-player-track-remaining">
								{trackDuration}
							</span>
						</div>
					</div>
					<div className="mp3-player-volume-container">
						<div className="mp3-player-menu-buttons">
							{this.props.hasPlaylist && (
								<button
									className="mp3-player-playlist-control"
									onClick={this.props.playlistClickHandler}
								>
									<Icon iconName="playlist" fill={"white"} />
								</button>
							)}
							<button
								className="mp3-player-hide-control"
								onClick={() => {
									this.setState(
										{ isHidden: this.state.isHidden ? false : true },
										() => this.props.togglePlaylist(this.state.isHidden)
									);
								}}
							>
								<Icon iconName="hide" fill={"white"} />
							</button>
							<button
								className="mp3-player-close-control"
								onClick={() => {
									this.closePlayer();
								}}
							>
								<Icon iconName="close" fill={"white"} />
							</button>
						</div>
						<div className="mp3-player-volume-slider">
							<button
								className="mp3-player-tape-controls-mute"
								onClick={evt => this.muteSound(evt)}
							>
								{
									<Icon
										iconName={!this.state.volumeLevel ? "mute" : "volume"}
									/>
								}
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
				</div>
			);
		}
	}
}

// module.exports = Player;
