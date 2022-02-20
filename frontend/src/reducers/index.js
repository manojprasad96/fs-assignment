import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import products from "./products";
export default combineReducers({
    auth,
    message,
    products,
});