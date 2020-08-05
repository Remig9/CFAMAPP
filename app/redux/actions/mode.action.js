import { SELECT_DURATION, OFFERING_MODE, SELECT_RECURRING } from "../types";

export const setOfferingMode = (value) => {
  return {
    type: OFFERING_MODE,
    payload: value,
  };
};

export const setDuration = (value) => {
  return {
    type: SELECT_DURATION,
    payload: value,
  };
};

export const setRecurring = (value) => {
  return {
    type: SELECT_RECURRING,
    payload: value,
  };
};
