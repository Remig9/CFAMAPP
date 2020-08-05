import {
  DESTINATION,
  SELECT_DURATION,
  SELECT_RECURRING,
  OFFERING_SWITCH,
  OFFERING_TYPE,
  OFFERING_AMOUNT,
  CARD_NUMBER,
  PAYMENT_PLAN,
  TRANSACTION_COST,
} from '../types';

export const setChurchDestination = (value) => {
  return {
    type: DESTINATION,
    payload: value,
  };
};

export const setOfferingSwitch = (value) => {
  return {
    type: OFFERING_SWITCH,
    payload: value,
  };
};

export const setOfferingType = (value) => {
  return {
    type: OFFERING_TYPE,
    payload: value,
  };
};

export const setOfferingAmount = (value) => {
  return {
    type: OFFERING_AMOUNT,
    payload: value,
  };
};

export const setCardNumber = (value) => {
  return {
    type: CARD_NUMBER,
    payload: value,
  };
};

export const setPaymentPlan = (value) => {
  return {
    type: PAYMENT_PLAN,
    payload: value,
  };
};

export const setTransactionCost = (value) => {
  return {
    type: TRANSACTION_COST,
    payload: value,
  };
};
