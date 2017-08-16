import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from './Room';

const ROOT_URL = 'https://challenges.1aim.com/roombooking/';

class ListOfRooms extends Component {
  constructor(props) {
    super(props);
    this.renderRooms = this.renderRooms.bind(this);
  }

  renderRooms() {
    if (this.props.rooms && this.props.rooms.length >= 1) {
      return this.props.rooms[0].map((room, index) => {
        if (room.name.indexOf(this.props.nameStart) === 0){
          return (
            <Room
              key={index}
              name={room.name}
              image={room.images.length !== 0 ? (ROOT_URL + room.images[0]) : './images/no-image-available.jpg'}
              capacity={room.capacity}
            />
          );
        }
      }
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <div className="listOfRooms"> {this.renderRooms()} </div>
      </div>
    );
  }
}

export default connect(state => ({ rooms: state.rooms }))(ListOfRooms);
