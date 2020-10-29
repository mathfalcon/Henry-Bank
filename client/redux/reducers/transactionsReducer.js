import * as C from "../constants";

const initialState = {
    allTransactions: [],
    allTransactionsById: []  
};

function transactionsReducer(state = initialState, action) {  
  switch (action.type) {
    case C.getAllTransactions: {
      return { ...state, allTransactions: action.payload.transactions };
    }

    case C.getAllTransactionsById: {
      return { ...state, allTransactionsById: action.payload.transactions };
    }

    default:
      return state;
    }
}
export default transactionsReducer;