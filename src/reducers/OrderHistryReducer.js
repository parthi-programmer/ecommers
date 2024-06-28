import { ORDERED_PRODUCT } from "../actions/OrderHistryAction";

const initialState = {
  orderProduct: [],
};

const orderProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERED_PRODUCT:
      return {
        ...state,
        orderProduct: action.payload,
      };
    default:
      return state;
  }
};

export default orderProductReducer;
