import * as C from "../constants";

const initialState = {
    accountHistory: [],
    funds:"",
    responseSent:{}
};

function accountReducer(state = initialState, action) {  
  switch (action.type) {
    case C.accountHistory: {
      return { ...state, accountHistory: action.payload };
    }
    
    case C.verifyFunds: {
      return { ...state, funds: action.payload };
    }

    case C.sendMoney: {
      return { ...state, responseSent: action.payload };
    }

    default:
      return state;
    }
}
export default accountReducer;