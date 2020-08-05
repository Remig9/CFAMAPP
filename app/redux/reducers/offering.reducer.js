import {
  DESTINATION,
  OFFERING_AMOUNT,
  OFFERING_SWITCH,
  OFFERING_TYPE,
  CARD_NUMBER,
  PAYMENT_PLAN,
  TRANSACTION_COST,
} from '../types';

const initialState = {
  selectRecurring: 'Weekly',
  selectDuration: '1',
  destinationDetails: null,
  offeringType: '',
  offeringAmount: '',
  offeringSwitch: 'onceoff',
  cardNumber: '',
  paymentPlan: '',
  transactionCost: false,
};

export default function offering(state = initialState, action) {
  switch (action.type) {
    case DESTINATION:
      return Object.assign({}, state, {
        destinationDetails: action.payload,
      });

    case OFFERING_TYPE:
      return Object.assign({}, state, {
        offeringType: action.payload,
      });

    case OFFERING_SWITCH:
      return Object.assign({}, state, {
        offeringSwitch: action.payload,
      });

    case OFFERING_AMOUNT:
      return Object.assign({}, state, {
        offeringAmount: action.payload,
      });

    case CARD_NUMBER:
      return Object.assign({}, state, {
        cardNumber: action.payload,
      });
    case PAYMENT_PLAN:
      return Object.assign({}, state, {
        paymentPlan: action.payload,
      });
    case TRANSACTION_COST:
      return Object.assign({}, state, {
        transactionCost: action.payload,
      });
  }
  return state;
}
