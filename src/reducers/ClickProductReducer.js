import { CURRENT_PRODUCT } from "../actions/ClickProductAction";

const initialState = {
  product: [],
};

const currentProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PRODUCT:
      return {
        ...state,
        product: [action.payload],
      };
    default:
      return state;
  }
};

export default currentProductReducer;
