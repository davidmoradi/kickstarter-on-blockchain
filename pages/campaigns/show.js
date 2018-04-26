import React , { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card } from 'semantic-ui-react';
import web3 from '../../ethereum/web3'

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
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description: `You must contribute at least ${minimumContribution} Wei to become a contributer`,
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description: 'A Request tries to withdraw money from the contract. Requests must be approved by contributers',
      },
      {
        header: contributersCount,
        meta: 'Number of Contributers',
        description: 'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (Ether)',
        description: 'The balance is how much money this campaign has left to spend',
      },
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
