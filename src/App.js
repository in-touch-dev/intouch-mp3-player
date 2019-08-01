import React from 'react';
import './lib/scss/App.scss';
import Playlist from './lib/components/Playlist';

const App = () => {
  const tracks = [
      { name:'hello', src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3'},
      { name:'hello number 2', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
      { name:'hello number 2', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
      { name:'hello number 2', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
      { name:'hello number 3', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
  ]
  
  
  return (
      <header className="App-header">
        <Playlist tracks={ tracks } />
      </header>
  );
}

export default App;
