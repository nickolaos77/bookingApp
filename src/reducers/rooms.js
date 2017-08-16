import { FETCH_ROOMS, NEXT_HOUR_AVAILABLE } from '../actions/types';

export const roomsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return [action.payload.data];
    case NEXT_HOUR_AVAILABLE:
      return [action.payload];
    default:
      return state;
  }
};
