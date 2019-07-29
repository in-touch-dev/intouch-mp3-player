import React from 'react';
import './lib/scss/App.scss';
import Player from './lib/components/Player';

const App = () => {
  const tracks = [
      { name:'hello', src:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3'},
      { name:'hello number 2', src:'../audio/recording.mp3'},
      { name:'hello number 3', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
  ]
  
  
  return (
      <header className="App-header">
        <Player tracks={tracks}/>
      </header>
  );
}

export default App;
