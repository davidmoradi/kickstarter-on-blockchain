import React , { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getCampaginSummery().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      contributersCount: summary[3],
      manager: summary[4],
      campaignAddress: campaign.options.address
    }
  }

  renderSummaryCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      contributersCount,
      manager,
      campaignAddress
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
        <h3> Campaign {this.props.campaignAddress} </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderSummaryCards()}
            </Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.campaignAddress}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                <a>
                  <Button primary> View Spending Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;
