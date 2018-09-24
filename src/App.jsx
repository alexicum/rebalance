import { Component } from 'react';
import './App.css';
import { SelectOperator } from './pages';

export default class App extends Component {
  state = {
    name: 'rebalance',
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to {this.state.name}</h1>
        <SelectOperator />
      </div>
    );
  }
}
