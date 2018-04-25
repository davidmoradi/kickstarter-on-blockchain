import React , { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card } from 'semantic-ui-react';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getCampaginSummery().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      contributersCount: summary[3],
      manager: summary[4]
    }
  }

  renderSummaryCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      contributersCount,
      manager
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      }
    ]

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        {this.renderSummaryCards()}
      </Layout>
    )
  }
}

export default CampaignShow;
