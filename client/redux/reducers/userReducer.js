import * as C from "../constants";

const initialState = {
  users: [],
  userCreationSuccess: false,
};

function userReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case C.userCreated: {
      return { ...state, userCreationSuccess: action.payload.success };
    }
    default:
      return state;
  }
}

export default userReducer;
