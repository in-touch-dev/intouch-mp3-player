import React from "react";

// import { forwards } from './images/forward.svg';
import playButton from './images/play-button.svg';
// import backwards from './images/backward.svg'

class Player extends React.Component {
  render() {
      console.log(playButton)
    return (
      <div className="container">
        <div className="backwards">
            <svg src={playButton} alt='play-pause-icon'/>
        </div>
        <div className="play-pause"></div>
        <div className="forward"></div>
      </div>
    );
  }
}
export default Player;
