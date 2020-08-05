import { SELECT_DURATION, OFFERING_MODE, SELECT_RECURRING } from "../types";

const initialState = {
  offeringMode: "once_off",
  selectDuration: "1",
  selectRecurring: "Weekly",
};

export default function mode(state = initialState, action) {
  switch (action.type) {
    case SELECT_DURATION:
      return Object.assign({}, state, {
        selectDuration: action.payload,
      });
    case OFFERING_MODE:
      return Object.assign({}, state, {
        offeringMode: action.payload,
      });
    case SELECT_RECURRING:
      return Object.assign({}, state, {
        selectRecurring: action.payload,
      });
  }
  return state;
}
