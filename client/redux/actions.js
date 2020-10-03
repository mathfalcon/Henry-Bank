import * as C from './constants'
import axios from "axios";

export function createUser(user) {
    return function (dispatch) {
      axios.post(`${C.SERVER_ADDRESS}/users/`, user)
        .then((res) => { dispatch({ type: C.CREATE_USER, payload: res.data }) })
        .catch((error) => alert(error, "error"));
    }
}