import { ActionSheet } from "native-base";
import * as C from "../constants";

const initialState = {
  success: false,
  user: { message: "No user is logged in." },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case C.getUserLogged: {
      return { ...state, success: action.payload.success, user: action.payload.user };
    }
    default:
      return state;
  }
}
export default userReducer;
