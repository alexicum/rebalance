import { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { getOperators, addOperator } from '../api';

import ComboBox from '../components/ComboBox';
import ErrorLabel from '../components/ErrorLabel';
import errHandling from '../utils/errorHandlingUtils';

// import './App.css';

export default class SelectOperator extends Component {
  state = {
    operators: null,
    currentOperator: null,
    // eslint-disable-next-line react/no-unused-state
    uiState: {
      errors: [],
    },
  };

  componentDidMount() {
    this.toggleLoading(true);
    this.asyncRequest = getOperators()
      .then((operators) => {
        this.asyncRequest = null;
        this.setState({ operators });
      })
      .catch(err => errHandling.reThrowError(err, 'Operators list loading error'))
      .catch(err => this.setState(errHandling.setFormError({ message: err.message })))
      .finally(() => this.toggleLoading(false));
  }

  componentWillUnmount() {
    if (this.asyncRequest) {
      this.asyncRequest.cancel();
    }
  }

  /**
   * toggleLoading - set current loading state
   * @param {boolean} value - true / false,
   */
  toggleLoading = (value = null) => {
    const loading = (value !== null) ? value : false;
    this.setState({ loading });
  }

  /**
   * operatorsToOptions - convert operators to the Dropdown options prop format
   */
  operatorsToOptions = items => items && items.map(i => ({
    // key: i.name,
    text: i.name,
    value: i.name,
  }));

  handleOperatorAddition = ({ value }) => {
    this.toggleLoading(true);
    addOperator(value)
      .then(() => {
        this.setState({
          operators: [{ name: value }, ...this.state.operators],
          currentOperator: value,
        });
      })
      .catch(err => errHandling.reThrowError(err, `Operation Failed. Add operator "${value}"`))
      .catch(err => this.setState(errHandling.setFormError({ message: err.message })))
      .finally(() => this.toggleLoading(false));
  }

  handleOperatorChange = (data) => {
    // do not select value before it was added to list
    if (this.state.operators.findIndex(op => op.name === data.value) === -1) {
      return;
    }
    this.setState({ currentOperator: data.value });
  }

  handleOperatorSearchChange = () => this.setState(errHandling.clearFormError());

  render() {
    const {
      operators, currentOperator: value, loading,
    } = this.state;

    const error = errHandling.getFormError({ state: this.state });

    const options = this.operatorsToOptions(operators);
    return (
      <Form error={!!error}>
        <Form.Field error={!!error}>
          {/* <label>A label</label> */}
          <ComboBox
            options={options}
            loading={loading}
            disabled={loading}
            value={value}
            onAddItem={this.handleOperatorAddition}
            onChange={this.handleOperatorChange}
            onOpen={this.handleOperatorSearchChange}
            additionLabel="Add new operator: "
            placeholder="Select operator"
          />
          <ErrorLabel error={error} />
        </Form.Field>
      </Form>
    );
  }
}
