import React from "react";
import Icon from "../icons/PlayerIcons";
import "../scss/app.css";
import Player from "./Player";

export default class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIndex: this.props.currentIndex || 0,
			activeTrack: this.props.tracks[this.props.currentIndex || 0]
		};
	}

	componentWillReceiveProps(newProps) {
		
		this.setState({
			activeTrack: newProps.tracks[newProps.currentIndex || 0],
			currentIndex: newProps.currentIndex || 0
		})
	}

	componentWillMount() {

		this.breakpoint = window.matchMedia( '(max-width: 768px)' );
		const breakpointHandler = () => this.setState({ isMobile : this.breakpoint.matches }) ;

		this.breakpoint.addListener( breakpointHandler );
		breakpointHandler();
	}

	viewPlaylistBox = evt => {
		evt.preventDefault();
		if (!this.state.viewPlaylist) this.setState({ viewPlaylist: true });
		else this.setState({ viewPlaylist: false });
	};

	playlistContent() {
		const playlist = this.props.tracks.map((track, key) => {
			const isActive = track.src === this.state.activeTrack.src ? 'active' : ''
			return (
				<button
					className={`mp3-player-playlist-track-button ${isActive}`}
					key={key}
					onClick={() => this.setActiveTrack(track)}
				>
					{track.name}
				</button>
			);
		});
		return playlist;
	}

	setActiveTrack = track => {
		if (track.src === this.state.activeTrack) {
			return;
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

		const styleOffsetOverides = Object.assign({}, { left: '0px', right: '0px' }, this.props.opts && this.props.opts.offset);
		styleOffsetOverides.left = `${styleOffsetOverides.left}px`;
		styleOffsetOverides.right = `${styleOffsetOverides.right}px`;

		return (
			<div className={`mp3-player-playlist-container ${showPlaylist} ${isMobile}`}>
				<div className="mp3-player-playlist-header">
					{this.state.activeTrack && <p className='playlist-title'>{this.state.activeTrack.playlistName} </p>}
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
		console.log(this.props);
		return (
			<div className={this.state.isMobile ? "playlist-wrap is-mobile" : "playlist-wrap"}>
				<Player
					activeTrack={this.state.activeTrack}
					hasPlaylist={true}
					playlistClickHandler={evt => this.playlistClickHandler(evt)}
					skipHandler={(evt, type) => this.skipHandler(evt, type)}
					togglePlaylist={condition => this.togglePlaylist(condition)}
					isMobile={this.state.isMobile}
					opts={this.props.opts}
					onClose={this.props.onClose}
				/>
				{this.playlistBody()}
			</div>
		);
	}
}
