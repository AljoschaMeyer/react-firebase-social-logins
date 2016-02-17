'use strict';

import React from 'react';
import {Panel, Table} from 'react-bootstrap';

class ErrorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = (
      <h3>Authentication Errors</h3>
    );

    if (this.props.error === null) {
      return <Panel
        className='errorComponent'
        header={title}
        bsStyle='success'>
        Yay, no errors!
      </Panel>;
    } else {
      return <Panel
        className='errorComponent'
        header={title}
        bsStyle='danger'>
        <Table fill>
          <tbody>
            <tr>
              <td>Code</td>
              <td>{this.props.error.code}</td>
            </tr>
            <tr>
              <td>Message</td>
              <td>{this.props.error.message}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td>{this.props.error.details}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>;
    }
  }
}

ErrorComponent.displayName = 'ErrorComponent';

// Uncomment properties you need
// ErrorComponent.propTypes = {};

ErrorComponent.defaultProps = {
  error: null
};

export default ErrorComponent;
