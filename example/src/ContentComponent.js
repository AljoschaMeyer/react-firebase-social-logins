'use strict';

import React from 'react';
import {Panel, Table, Image} from 'react-bootstrap';

class ContentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = (
      <h3>Authentication Information</h3>
    );

    const auth = this.props.auth;
    const provider = auth === null ? null : auth.provider;

    if (auth === null) {
      return <Panel
        className='ContentComponent'
        header={title}
        bsStyle='info'>
        Not logged in.
      </Panel>;
    } else {
      return <Panel
        className='ContentComponent'
        header={title}
        bsStyle='info'>
        <p className='lead'>
          {`Welcome, ${auth[provider].displayName === null ? auth[provider].username : auth[provider].displayName}.`}
        </p>
        <Image
          src={auth[provider].profileImageURL}
          style={{maxWidth: '128'}}
          thumbnail
          responsive/>
        <Table fill>
          <tbody>
            <tr>
              <td>firebase uid</td>
              <td>{auth.uid}</td>
            </tr>
            <tr>
              <td>provider</td>
              <td>{provider}</td>
            </tr>
            <tr>
              <td>{provider} id</td>
              <td>{auth[provider].id}</td>
            </tr>
            {
              auth[provider].displayName === null ? '' :
                <tr>
                  <td>{provider} displayname</td>
                  <td>{auth[provider].displayName}</td>
                </tr>
            }
            {
              auth[provider].username === undefined ? '' :
                <tr>
                  <td>{provider} username</td>
                  <td>{auth[provider].username}</td>
                </tr>
            }
          </tbody>
        </Table>
      </Panel>;
    }
  }
}

ContentComponent.displayName = 'ContentComponent';

// Uncomment properties you need
// ContentComponent.propTypes = {};

ContentComponent.defaultProps = {
  auth: null
};

export default ContentComponent;
