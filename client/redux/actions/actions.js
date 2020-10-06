import * as C from '../constants'
import axios from "axios";

export const createUser = (userData) => {
  return function (dispatch) {
    axios
      .post(`${C.SERVER_ADDRESS}/users/create`,userData)
      .then((response) => {
        dispatch({ type: C.userCreated, payload: response.data });
      });
  };
};