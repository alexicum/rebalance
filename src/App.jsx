import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {
  SelectOperator, RechargeOperatorBalance,
  RechargeSuccess, RechargeFailure,
} from './pages';
import './App.css';

const RechargeRoute = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={RechargeOperatorBalance} />
    <Route path={`${match.url}/success`} component={RechargeSuccess} />
    <Route path={`${match.url}/failure`} component={RechargeFailure} />
  </div>
);

RechargeRoute.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default class App extends Component {
  state = {
    name: 'Rebalance',
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <Router>
          <div>
            <Route exact path="/" component={SelectOperator} />
            <Route path="/recharge" component={RechargeRoute} />
          </div>
        </Router>
      </div>
    );
  }
}
