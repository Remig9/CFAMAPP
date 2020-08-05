import {PAUSE_AUDIO} from '../types';

const initialState = {
  pauseAudio: false,
};

export default function userDetails(state = initialState, action) {
  switch (action.type) {
    case PAUSE_AUDIO:
      return Object.assign({}, state, {
        pauseAudio: action.payload,
      });
  }
  return state;
}
