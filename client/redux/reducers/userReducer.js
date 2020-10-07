import * as C from "../constants";

const initialState = {
  users: [],
  userCreationSuccess: false,
  responseLocation: ""
};

function userReducer(state = initialState, action) {  
  switch (action.type) {
    case C.userCreated: {
      return { ...state, userCreationSuccess: action.payload.success };
    }  
  
    case C.validateAddress: {      
      return { ...state, responseLocation: action.payload };
    }

    default:
      return state;
    }
}
export default userReducer;