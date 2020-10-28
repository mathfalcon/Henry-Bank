import * as C from "../constants";
import axios from "axios";
import { api } from "../../components/Constants/constants";

export const getContactList = (id) => {
  return function (dispatch) {
    axios(`${api}/contacts/${id}`)
    .then((response) => {
      dispatch({ type: C.getContactList, payload: response.data });
    })
    .catch( err => console.log( err ));
  };
};

export const addContact = (contactName, contactEmail, userId, userName ) => {
  return function (dispatch) {
    axios
      .post(`${api}/contacts/create`, {
        userId,
        alias: contactName,
        emailOfContact: contactEmail,
        phoneNumber: contactPhoneNumber
      })
      .then((response) => {
        dispatch({ type: C.addContact, payload: response.data });
      })
      .catch( err => console.log( err ));
  };
};

export const deleteContact = (id) => {
  return function (dispatch) {
    axios
      .delete(`${api}/contacts/delete/${id}`)
      .then((response) => {
        dispatch({ type: C.deleteContact, payload: response.data });
      })
      .catch( err => console.log( err ));
  };
};

export const modifyContact = (contactName, id) => {
  return function (dispatch) {
    axios
      .put(`${api}/contacts/update/${id}`, {
        alias: contactName,
      })
      .then((response) => {
        dispatch({ type: C.modifyContact, payload: response.data });
      })
      .catch( err => console.log( err ));
  };
};
