import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  createCampaign = async () => {
    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message})
    }

    this.setState({ loading: false })
  }

  render() {
    return(
      <Layout>
        <h3>Create a Campaign</h3>
        <Form error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label='Wei'
                   labelPosition='right'
                   value={this.state.minimumContribution}
                   onChange={event =>
                     this.setState({ minimumContribution: event.target.value })
                   } />
          </Form.Field>
          <Message error header='Oops!' content={this.state.errorMessage} />
          <Button primary
                  onClick={this.createCampaign}
                  loading={this.state.loading}>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
