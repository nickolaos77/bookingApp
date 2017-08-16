import moment from 'moment';
import 'moment-timezone';
import { NEXT_HOUR_AVAILABLE } from '../actions/types';

export default (response, dispatch) => {
  const fmt = 'MM/DD/YYYY HH:mm';
  const datefmt = 'MM/DD/YYYY';
  const zone = 'Europe/Berlin';
  const now = moment().unix();
  const oneHourLater = moment().add(1, 'h').unix();
  const currentDateInBerlin = moment().tz('Europe/Berlin').format(datefmt);
  const roomsAvailDuringNextHour = response.data.filter((room) => {
    let roomAvailableDuringTheNextHour = false;
    room.avail.forEach((timeInterval) => {
      const availFromString = currentDateInBerlin + ' ' + timeInterval.slice(0, 5);
      const availUntilString = currentDateInBerlin + timeInterval.slice(7, 13);
      const availFrom = moment.tz(availFromString, fmt, zone).unix();
      const availUntil = moment.tz(availUntilString, fmt, zone).unix();
      if ((availUntil > now && availFrom < oneHourLater) && !roomAvailableDuringTheNextHour) {
        roomAvailableDuringTheNextHour = true;
      }
    });
    return roomAvailableDuringTheNextHour;
  });
  dispatch({
    type: NEXT_HOUR_AVAILABLE,
    payload: roomsAvailDuringNextHour,
  });
};
