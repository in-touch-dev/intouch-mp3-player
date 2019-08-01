import React from 'react';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import Forward from './Forward';
import Backward from './Backward';
import Playlist from './Playlist';
import Mute from './Mute';
import Hide from './Hide';
import Volume from './Volume';
import Close from './Close';

var Icon = function Icon(props) {
  switch (props.iconName) {
    case 'play':
      return React.createElement(PlayButton, props);

    case 'pause':
      return React.createElement(PauseButton, props);

    case 'forward':
      return React.createElement(Forward, props);

    case 'backward':
      return React.createElement(Backward, props);

    case 'playlist':
      return React.createElement(Playlist, props);

    case 'mute':
      return React.createElement(Mute, props);

    case 'hide':
      return React.createElement(Hide, props);

    case 'volume':
      return React.createElement(Volume, props);

    case 'close':
      return React.createElement(Close, props);

    default:
      return React.createElement("div", null, "Check the iconName prop is correct");
  }
};

export default Icon;