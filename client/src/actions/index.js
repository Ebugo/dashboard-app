import axios from 'axios';
import {FETCH_USER} from './types';

// action creator
export const fetchUser = () => {
  return function(dispatch) { // dispatch will be called by react thunk middleware, so action is executed only when a response is returned
    axios.get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  }
};