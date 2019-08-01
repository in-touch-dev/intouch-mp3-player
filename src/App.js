import React from 'react';
import './lib/scss/App.scss';
import Playlist from './lib/components/Playlist';

const App = () => {
  const tracks = [
      { img: './images/music.png', name:'hello number 3', desc: 'Description 1 is here', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
      { img: './images/music.png', name:'hello', desc: 'Description 2 is here', src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3'}
  ]
  
  
  return (
      <header className="App-header">
        <Playlist tracks={ tracks } />
      </header>
  );
}

export default App;
