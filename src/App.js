import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import Player from './Player';
// import Playlist from './Playlist';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Player/>
        {/* <Playlist/> */}
      </header>
    </div>
  );
}

export default App;
