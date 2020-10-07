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

export const getLocation = ( country, state, locality, street, streetNumber ) => {
  return function (dispatch) {
    axios
      .post( `https://us1.locationiq.com/v1/search.php?key=${ C.API_LOCATION }&q=${ country }%20${ state }%20${ locality }%20${ street }%20${ streetNumber }&format=json`)
      .then((response) => {
        dispatch({ type: C.validateAddress, payload: response });
      });
  };
};

export const resetPass = ( email ) => {
  return function (dispatch) {
    axios
      .post(`${C.SERVER_ADDRESS}/users/?????????`,email )
      .then((response) => {
        dispatch({ type: C.resetPass, payload: response });
      });
  };
};