import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userReducer from "./reducers/userReducer";
import authReducer from './reducers/authReducer';
import contactsReducer from "./reducers/contactsReducer";
import accountReducer from './reducers/accountReducer';
import transactionsReducer from './reducers/transactionsReducer';
import thunk from "redux-thunk";


const reducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  contacts: contactsReducer,
  accountInfo: accountReducer,
  transactions: transactionsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;