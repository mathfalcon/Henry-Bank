import * as C from "../constants";

const initialState = {
  users: [],
  userCreationSuccess: false,
  // responseLocation: "",
  responseReset: false,
  // responseDelete: false,
  // responsePromote: false,
};

function userReducer(state = initialState, action) {  
  switch (action.type) {
    case C.getUsers: {
      return { ...state, users: action.payload.users };
    }

    // case C.deleteUser: {         
    //   return { ...state, responseDelete: action.payload.success };
    // }

    // case C.promoteUser: {      
    //   return { ...state, responsePromote: action.payload.success };
    // }

    case C.userCreated: {
      return { ...state, userCreationSuccess: action.payload.success };
    }  
  
    case C.validateAddress: {      
      return { ...state, responseLocation: action.payload };
    }

    case C.resetPass: {      
      return { ...state, responseReset: action.payload };
    }

    default:
      return state;
    }
}
export default userReducer;