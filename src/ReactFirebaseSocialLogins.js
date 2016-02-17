'use strict';

import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import SocialButton from 'react-social-button';

class ReactFirebaseSocialLogins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProvider: null
    };
  }

  render() {
    const loginProvider = (provider) => {
      return () => {
        this.setState({loadingProvider: provider});
        const self = this;
        this.props.fireRef.authWithOAuthPopup(provider, function(error, authData) {
          if (error) {
            if (error.code === 'TRANSPORT_UNAVAILABLE') {
              this.props.fireRef.authWithOAuthRedirect(provider, function(error) {
                if (error) {
                  self.setState({loadingProvider: null});
                  self.props.errorHandler(error);
                } else {
                  //success via redirect
                  self.setState({loadingProvider: null});
                }
              });
            } else {
              self.setState({loadingProvider: null});
              self.props.errorHandler(error);
            }
          } else if (authData) {
            // success via popup
            self.setState({loadingProvider: null});
          }
        });
      }
    }

    const buttons = this.props.providers.map((provider) => {
      return (
        <SocialButton
          key={provider}
          social={provider}
          text={this.props.textFn(provider)}
          loading={this.state.loadingProvider === provider}
          btnProps={{
            disabled: this.state.loadingProvider !== null,
            onClick: this.state.loadingProvider === null ? loginProvider(provider).bind(this) : null
          }}/>
      )
    });

    return (
      <ButtonToolbar className='socialLogins'>
        {buttons}
      </ButtonToolbar>
    );
  }
}

ReactFirebaseSocialLogins.displayName = 'ReactFirebaseSocialLogins';

// Uncomment properties you need
ReactFirebaseSocialLogins.propTypes = {
  fireRef: React.PropTypes.object.isRequired,
  providers: React.PropTypes.arrayOf(React.PropTypes.string),
  textFn: React.PropTypes.func,
  errorHandler: React.PropTypes.func
};

ReactFirebaseSocialLogins.defaultProps = {
  providers: ['google', 'facebook', 'twitter', 'github'],
  textFn: (social) => {return null;},
  errorHandler: (error) => {}
};

export default ReactFirebaseSocialLogins;
