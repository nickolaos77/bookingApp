import React from 'react';

const Room = (props) => {
  return (
    <div className="room">
      <div className="panel">
        <img className="room__img img-thumbnail" src={props.image} alt="Room" />
        <div className="room__description">
          <h4 className="roomInfo">Room: {props.name}</h4>
          <h4 className="roomInfo">Capacity: {props.capacity}</h4>
        </div>
      </div>
    </div>
  );
};

Room.propTypes = {
  image: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  capacity: React.PropTypes.number.isRequired,
};

export default Room;
