import axios from 'axios';

import { FETCH_ROOMS } from './types';
import nextHourRoomsController from '../helpers/actionHelper';

const ROOT_URL = 'https://challenges.1aim.com/roombooking/';

export const fetchRooms = date =>
  (dispatch) => {
    const url = `${ROOT_URL}getrooms`;
    axios.post(url, { date })
      .then((response) => {
        dispatch({
          type: FETCH_ROOMS,
          payload: response,
        });
      })
      .catch(error => console.log(error));
  };


export const roomsAvailableNextHour = () =>
  (dispatch) => {
    const url = `${ROOT_URL}getrooms`;
    axios.post(url, { date: 'today' })
      .then(response => nextHourRoomsController(response, dispatch)
      )
      .catch(error => console.log(error));
  };
