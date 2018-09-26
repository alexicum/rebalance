import { Fragment, Component } from 'react';
import { Form, Header, Input } from 'semantic-ui-react';
// import { getOperators, addOperator } from '../api';

import ErrorLabel from '../components/ErrorLabel';
import errHandling from '../utils/errorHandlingUtils';

export default class RefillOperatorBalance extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    uiState: {
      errors: [],
    },
  };

  render() {
    // const {
    //   loading,
    // } = this.state;
    const operator = 'MTS';
    const error = errHandling.getFormError({ state: this.state });

    return (
      <Fragment>
        <Header as="h2" textAlign="center">
          Refill {operator} balance
        </Header>
        <Form error={!!error}>
          <Form.Field error={!!error}>
            {/* <label>A label</label> */}
            <Input />
            <ErrorLabel error={error} />
          </Form.Field>
          {/*
          <Message
            error
            header="Error"
            content="You can only sign up for an account once with a given e-mail address."
          />
          */}
        </Form>
      </Fragment>
    );
  }
}

