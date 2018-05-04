import react, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes'

class ContributeForm extends Component {
  state = {
    contributeValue: '',
    loading: false,
    errorMessage: ''
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });
    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contributeValue, 'ether')
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label> Amount to Contribute </label>
            <Input label="ether"
                   labelPosition="right"
                   value={this.state.contributeValue}
                   onChange={event => this.setState({ contributeValue: event.target.value }) }
                   />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}> Contribute! </Button>
        </Form>
      </div>
    )
  }
}

export default ContributeForm;
