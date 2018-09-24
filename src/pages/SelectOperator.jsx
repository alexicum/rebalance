import { Component } from 'react';
// import './App.css';
import ComboBox from '../components/ComboBox';

export default class SelectOperator extends Component {
  state = {
    name: 'Выбор оператора',
  };

  render() {
    return (
      <ComboBox title={this.state.name} />
    );
  }
}
