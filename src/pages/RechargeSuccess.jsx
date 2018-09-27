import React from 'react';
import PropTypes from 'prop-types';
import { Message, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RechargeSuccess = ({ location /* , history */ }) => {
  const { phone, amount, operator } = location.state.data;
  return (
    <div>
      <Message positive>
        <Message.Header>{operator.name} balance successfully recharged</Message.Header>
        <p>
          Phone: {phone}
          <br />
          Amount: {amount}
        </p>
      </Message>
      <Button primary as={Link} to="/">Back to operator selection</Button>
    </div>
  );
};

RechargeSuccess.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default RechargeSuccess;
