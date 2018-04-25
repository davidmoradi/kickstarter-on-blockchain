import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class Index extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return {campaigns}
  }

  renderCampagins() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a> View Campaign </a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Live Campaigns</h3>
          <Link route='/campaigns/new'>
            <a>
              <Button floated='right'
                      content='Create Campaign'
                      icon='add circle'
                      primary />
            </a>
          </Link>
          <div>{this.renderCampagins()}</div>
        </div>
      </Layout>
    );
  }
}

export default Index;
