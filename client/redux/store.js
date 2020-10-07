import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";


const reducer = combineReducers({
  users: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;