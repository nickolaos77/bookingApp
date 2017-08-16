import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment-timezone';

import { fetchRooms, roomsAvailableNextHour } from '../actions/index';
import ListOfRooms from './ListOfRooms';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: moment(), clicked: false, name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchRooms('today'));
  }

  handleNameInput(event) {
    this.setState({
      name: event.target.value,
    });

  }

  handleChange(e) {
    this.setState({ startDate: e });
    this.props.dispatch(fetchRooms(e.unix()));
  }

  clickHandler() {
    this.setState({ startDate: moment() });
    if (this.state.clicked) this.props.dispatch(fetchRooms('today'));
    else {
      this.props.dispatch(roomsAvailableNextHour());
    }
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div className="app">
        <div className="datePickerContainer">
          <h3 className="datePickerContainer__prompt">Rooms available at:</h3>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
        <div className="formCont">
          <input
            className="input roomFilter"
            type="text"
            placeholder="filter rooms by name"
            value={this.state.name}
            onChange={this.handleNameInput}
          />
          <button className="btn btn-warning" onClick={this.clickHandler}>
            { this.state.clicked ? 'Show rooms available today' : 'Show rooms available during next hour' }
          </button>
        </div>
        <ListOfRooms nameStart={this.state.name} />
      </div>
    );
  }
}

export default connect(state => ({
  rooms: state.rooms,
}))(App);
