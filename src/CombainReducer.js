import { combineReducers } from "redux";
import currentProductReducer from "./reducers/ClickProductReducer";
import cartProductReducer from "./reducers/cartProductReducer";
import orderProductReducer from "./reducers/OrderHistryReducer";

const rootReducer = combineReducers({
    clickedProduct : currentProductReducer,
    cartProduct: cartProductReducer,
    orderedProduct: orderProductReducer
})

export default rootReducer;