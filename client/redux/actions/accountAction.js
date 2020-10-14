import * as C from '../constants'
import axios from "axios";
import { api } from "../../components/Constants/constants";

export const getAccountHistory = ( account ) => {
  return function (dispatch) {
    axios
    //   .post(`${api}/users/create`,userData)
      .then((response) => {
        dispatch({ type: C.accountHistory, payload: response.data });
      });
  };
};