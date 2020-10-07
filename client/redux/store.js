import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userReducer from "./reducers/userReducer";
import authReducer from './reducers/authReducer'
import thunk from "redux-thunk";


const reducer = combineReducers({
  users: userReducer,
  auth: authReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;