import { USER_TOKEN, USER_DETAILS } from "../types";

export const setUserToken = (value) => {
  return {
    type: USER_TOKEN,
    payload: value,
  };
};

export const setUserDetails = (value) => {
  return {
    type: USER_DETAILS,
    payload: value,
  };
};
