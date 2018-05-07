import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button } from 'semantic-ui-react';

class RequestsIndex extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;

    return { address };
  }

  render() {
    return(
      <Layout>
        <h3>Spending Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary> Create Request</Button>
          </a>
        </Link>
      </Layout>
    )
  }
}

export default RequestsIndex;
