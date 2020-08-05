import { USER_TOKEN, USER_DETAILS } from "../types";

const initialState = {
  userToken: null,
  userDetails: null,
};

export default function userDetails(state = initialState, action) {
  switch (action.type) {
    case USER_TOKEN:
      return Object.assign({}, state, {
        userToken: action.payload,
      });

    case USER_DETAILS:
      return Object.assign({}, state, {
        userDetails: action.payload,
      });
  }
  return state;
}
