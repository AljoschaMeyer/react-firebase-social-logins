import Firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';

import SocialLogins from 'react-firebase-social-logins';
import ErrorComponent from './ErrorComponent';
import ContentComponent from './ContentComponent';
import {Jumbotron, PageHeader, Button, Grid, Row, Col} from 'react-bootstrap';

const authDataCallback = function(authData) {
  this.setState({
    auth: authData,
    error: null
  });
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      error: null
    }
  }

  componentWillMount() {
    this.fireRef = new Firebase('https://sociallogindemo.firebaseio.com');
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
        <Jumbotron className='text-center'>
          <PageHeader>
            Social-Logins Demo
          </PageHeader>
          <p>
            Demo for <a href="https://github.com/AljoschaMeyer/react-firebase-social-logins">React Firebase Social Logins</a>, which provides the login-bar below.
          </p>
          <p>
            There is a sample GitHub app, so the GitHub button will actually work.
          </p>
        </Jumbotron>
        <div className='container-fluid'>
          <Grid>
            <Row>
              <Col>
                {
                  this.state.auth === null ?
                  <SocialLogins
                    fireRef={this.fireRef}
                    errorHandler={((err) => {this.setState({error: err});}).bind(this)}
                    textFn={(provider) => {
                      switch (provider) {
                        case 'google':
                          return 'Sign in with Google'
                          break;
                        case 'facebook':
                          return 'Sign in with Facebook'
                          break;
                        case 'twitter':
                          return 'Sign in with Twitter'
                          break;
                        case 'github':
                          return 'Sign in with GitHub'
                          break;
                      }
                    }}/> :
                  <Button
                    block={true}
                    onClick={() => {this.fireRef.unauth()}}>
                    Logout
                  </Button>
                }
              </Col>
            </Row>
            <br/>
            <Row>
              <Col sm={8}>
                <ContentComponent
                  auth={this.state.auth}/>
              </Col>
              <Col sm={4}>
                <ErrorComponent
                  error={this.state.error}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppComponent />, document.getElementById('app'));
