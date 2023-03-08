import { createStore, combineReducers } from "redux";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  cardReducer
});

const store = createStore(rootReducer);

export default store;