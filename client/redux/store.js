import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userReducer from "./reducers/userReducer";
import authReducer from './reducers/authReducer';
import contactsReducer from "./reducers/contactsReducer";
import accountHistoryReducer from './reducers/accountReducer';
import thunk from "redux-thunk";


const reducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  contacts: contactsReducer,
  accountHistory: accountHistoryReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;