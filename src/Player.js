import React from "react";
import Icon from './icons/PlayerIcons'

class Player extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="backwards">
            <Icon iconName='play' fill={'red'} width={'100px'}/>
            <Icon iconName='pause' fill={'black'} width={'100px'}/>
            <Icon iconName='forward' fill={'yellow'} width={'100px'}/>
            <Icon iconName='backward' fill={'purple'} width={'100px'}/>
            <Icon iconName='playlist' fill={'green'} width={'100px'}/>
            <Icon iconName='mute' fill={'blue'} width={'100px'}/>
            <p>hello</p>
        </div>
        <div className="play-pause"></div>
        <div className="forward"></div>
      </div>
    );
  }
}
export default Player;
