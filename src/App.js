import React from 'react';
import './lib/scss/app.css';
import Playlist from './lib/components/Playlist';



class App extends React.Component {
	constructor( props ){
		super( props );

		this.state = {
			sidebar : false,
			tracks : [
				{ img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name: 'hello number 1', desc: 'Description 1 is here', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', playlistName: 'Series One' },
				{ img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name: 'hello number 2', desc: 'Description 1 is here', src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3', playlistName: 'Series One'},
				{ img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name: 'hello number 3', desc: 'Description 1 is here', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', playlistName: '3' },
				{ img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name: 'hello', desc: 'Description 2 is here', src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3', playlistName: '4' }
			]
		};
	}

	componentWillMount() {
        this.breakpoint = window.matchMedia( '(max-width: 1200px)' );
        const breakpointHandler = () => this.setState({ sidebar : this.breakpoint.matches }) ;
        this.breakpoint.addListener( breakpointHandler );
        breakpointHandler();
    }

	render(){

		const desktopOpts = {
            offset : { left : 300 },
            breakpoint : { maxWidth : 1200 }
        };

        const tabletOpts = {
            offset : { left : 0 },
            breakpoint : { maxWidth : 1200 }
        };

		return(
			<header className = "App-header" >
				<div className='playlist-holder'>
					<Playlist tracks={ this.state.tracks } opts={ this.state.sidebar ? tabletOpts : desktopOpts } />
				</div>
			</header>
		);
	}
}

export default App;
