const Icon = props => {
	switch (props.iconName) {
		case 'account':
			return <Account {...props} />;
		case 'message':
			return <Message {...props} />;
		case 'network':
			return <Network {...props} />;
		case 'profile':
			return <Profile {...props} />;
		case 'resources':
			return <Resources {...props} />;
		case 'work':
			return <Work {...props} />;
		case 'settings':
			return <Settings {...props} />;
		case 'close':
			return <Close {...props} />;
		case 'play':
			return <Play {...props} />;
		case 'basket':
			return <Basket {...props} />;
		default:
			return <div>Check the iconName prop is correct</div>;
	}
};

export default Icon;
