import * as C from '../constants'
import axios from "axios";
import { api } from "../../components/Constants/constants";

export const getUsers = () => {
  return function (dispatch) {
    axios
      .get(`${api}/users/`)
      .then((response) => {
        dispatch({ type: C.getUsers, payload: response.data });
      });
  };
};

// export const deleteUser = (id) => {
//   return function (dispatch) {
//     axios
//       .delete(`${api}/users/${id}`)
//       .then((response) => {
//         dispatch({ type: C.deleteUser, payload: response.data });
//       });
//   };
// };

// export const promoteUser = (id) => {
//   return function (dispatch) {
//     axios
//       .patch(`${api}/users/promote/${id}`)
//       .then((response) => {
//         dispatch({ type: C.promoteUser, payload: response.data });
//       });
//   };
// };

export const getLocation = ( country, state, locality, street, streetNumber ) => {
  return function (dispatch) {
    axios
      .post( `https://us1.locationiq.com/v1/search.php?key=${ C.API_LOCATION }&q=${ country }%20${ state }%20${ locality }%20${ street }%20${ streetNumber }&format=json`)
      .then((response) => {
        dispatch({ type: C.validateAddress, payload: response });
      });
  };
};

// export const resetPass = ( email ) => {
//   return function (dispatch) {
//     axios
//       .post(`${api}/users/?????????`,email )
//       .then((response) => {
//         dispatch({ type: C.resetPass, payload: response });
//       });
//   };
// };