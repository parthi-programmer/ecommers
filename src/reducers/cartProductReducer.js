import { CART_PRODUCT } from "../actions/cartProductAction";

const initialState = {
  bag: [],
};

const cartProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCT:
      return {
        ...state,
        bag: action.payload,
      };
    default:
      return state;
  }
};

export default cartProductReducer;
