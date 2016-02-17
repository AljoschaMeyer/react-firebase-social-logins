var React = require('react');
var ReactDOM = require('react-dom');
var ReactFirebaseSocialLogins = require('react-firebase-social-logins');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactFirebaseSocialLogins />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
