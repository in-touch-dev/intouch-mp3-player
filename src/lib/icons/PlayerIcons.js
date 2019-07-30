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

const Icon = props => {
	switch (props.iconName) {
        case 'play':
        return <PlayButton {...props} />
        case 'pause':
        return <PauseButton {...props} />
        case 'forward':
        return <Forward {...props} />
        case 'backward':
        return <Backward {...props} />
        case 'playlist':
        return <Playlist {...props} />
        case 'mute':
        return <Mute {...props} />
        case 'hide':
        return <Hide {...props} />
        case 'volume':
        return <Volume {...props} />
        case 'close':
        return <Close {...props} />
		default:
			return <div>Check the iconName prop is correct</div>;
	}
};

export default Icon;
