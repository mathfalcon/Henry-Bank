import * as C from "../constants";

const initialState = {
    accountHistory: [],
};

function accountHistoryReducer(state = initialState, action) {  
  switch (action.type) {
    case C.accountHistory: {
      return { ...state, accountHistory: action.payload };
    }  

    default:
      return state;
    }
}
export default accountHistoryReducer;