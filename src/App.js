import React from 'react';
import './lib/scss/App.scss';
import Playlist from './lib/components/Playlist';

const playlistOverideStylingOpts = {
  offset : {
    left : 300
  },
  breakpoint : {
    maxWidth : 768,
    removeOffset : true
  }
};

const App = () => {
  const tracks = [
    { img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name:'hello number 1', desc: 'Description 1 is here', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
    { img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name:'hello number 2', desc: 'Description 1 is here', src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3'},
    { img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name:'hello number 3', desc: 'Description 1 is here', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
    { img: 'https://icon-library.net/images/music-icon-transparent/music-icon-transparent-11.jpg', name:'hello', desc: 'Description 2 is here', src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3'}
]
  return (
      <header className="App-header">
        <div className='playlist-holder'>
          <Playlist tracks={ tracks } opts={ playlistOverideStylingOpts }/>
        </div>
      </header>
  );
}

export default App;
