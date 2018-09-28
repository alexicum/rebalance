import { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import makeComponentTrashable from 'trashable-react';
import { Form, Header, Input } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import * as api from '../api';

import ErrorLabel from '../components/ErrorLabel';
import errHandling from '../utils/errorHandlingUtils';
import stateUtils from '../utils/stateUtils';
import * as validations from '../utils/validations';

class RechargeOperatorBalance extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        operator: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    registerPromise: PropTypes.func.isRequired,
  }

  state = {
    data: {
      operator: this.props.location.state.operator,
    },
    uiState: {
      loading: false,
      errors: [],
      touchedFields: [],
    },
  };

  handleFieldBlur = (e, data) => {
    const field = data ? data.name : e.target.name;
    this.setState(stateUtils.setFieldTouched(field));
  }

  handleFieldChange = (e) => {
    const options = { field: e.target.name, value: e.target.value };
    this.setState(stateUtils.setFieldValue(options));
    const error = this.validateField(options);
    this.setState(stateUtils.setFormError({ field: options.field, error }));
  }

  handleSubmit = () => {
    this.setState(stateUtils.toggleLoading(true));
    const { name } = stateUtils.getFieldValue(this.state, 'operator');

    this.props.registerPromise(api.rechargeOperatorBalance(this.state.data))
      .then((data) => {
        const { error } = data;
        if (error) {
          this.props.history.push('/recharge/failure', { data: this.state.data, error });
          return;
        }
        this.props.history.push('/recharge/success', { data });
      })
      .catch(err => errHandling.reThrowError(err, `Operation Failed. Recharge ${name} balance`))
      .catch((err) => {
        this.setState(stateUtils.setFormError({ message: err.message }));
        this.props.history.push('/recharge/failure', { data: this.state.data, error: err.message });
      });
    // Not needed: only when show error inside this component
    // .finally(() => this.setState(stateUtils.toggleLoading(false)));
  }

  validateField = ({ field, value }) => {
    switch (field) {
      case 'phone':
        return validations.required(value) || validations.isPhone(value);
      case 'amount':
        return validations.required(value) || validations.intInRange(value, 1, 1000);
      default:
        throw new ReferenceError(`RechargeOperatorBalance.validateField(). Unknown field name: "${field}"`);
    }
  }

  formHasInvalidFields = () => {
    const phone = stateUtils.getFieldValue(this.state, 'phone');
    const amount = stateUtils.getFieldValue(this.state, 'amount');
    return !!this.validateField({ field: 'phone', value: phone }) ||
      !!this.validateField({ field: 'amount', value: amount });
  }

  showFieldError = (field) => {
    if (!stateUtils.isFieldTouched(this.state, { field })) {
      return null;
    }
    return stateUtils.getFormError(this.state, { field });
  }

  render() {
    const operator = stateUtils.getFieldValue(this.state, 'operator');
    const loading = stateUtils.isLoading(this.state);

    const errors = stateUtils.getFormErrors(this.state);
    const phoneError = this.showFieldError('phone');
    const amountError = this.showFieldError('amount');
    const isDisabledSubmit = errors.length > 0 || this.formHasInvalidFields();

    return (
      <Fragment>
        <Header as="h2">
          Recharge {operator.name} balance
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field error={!!phoneError} required>
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label htmlFor="rechargeOperator-phone">Phone number</label>
            <Input error={!!phoneError}>
              <MaskedInput
                id="rechargeOperator-phone"
                name="phone"
                mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholder="+7 (999) 999-9999"
                keepCharPositions
                onChange={this.handleFieldChange}
                onBlur={this.handleFieldBlur}
              />
            </Input>
            <ErrorLabel error={phoneError} />
          </Form.Field>
          <Form.Field error={!!amountError} required>
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label htmlFor="rechargeOperator-amount">Amount</label>
            <Input error={!!amountError}>
              <MaskedInput
                id="rechargeOperator-amount"
                name="amount"
                mask={[/[1-9]/, /\d/, /\d/, /\d/]}
                placeholder="Amount"
                guide={false}
                onChange={this.handleFieldChange}
                onBlur={this.handleFieldBlur}
              />
            </Input>
            <ErrorLabel error={amountError} />
          </Form.Field>
          <Form.Button
            content="Submit"
            disabled={isDisabledSubmit}
            loading={loading}
            positive={!isDisabledSubmit}
          />
        </Form>
      </Fragment>
    );
  }
}

// Passes the registerPromise() function from trashable-react to Component
export default makeComponentTrashable(RechargeOperatorBalance);
