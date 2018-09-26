import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
} from 'react-router-dom';
import { SelectOperator, RefillOperatorBalance } from './pages';
import './App.css';

export default class App extends Component {
  state = {
    name: 'rebalance',
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to {this.state.name}</h1>
        <Router>
          <div>
            <Route exact path="/" component={SelectOperator} />
            <Route path="/mts" component={RefillOperatorBalance} />
          </div>
        </Router>
      </div>
    );
  }
}
