import React from 'react';
import ReactDOM from 'react-dom';
import SocialLogins from 'react-firebase-social-logins';
import Firebase from 'firebase';

const authDataCallback = function(authData) {
  this.setState({auth: authData});
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null
    }
  }

  componentWillMount() {
    this.fireRef = new Firebase('https://planned.firebaseio.com');
  }

  componentDidMount() {
    this.fireRef.onAuth(authDataCallback.bind(this));
  }

  componentWillUnmount() {
    this.fireRef.offAuth(authDataCallback);
  }

  render() {
    return (
      <div>
        <SocialLogins
          fireRef={this.fireRef}/>
        <div>
          Hi!
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
