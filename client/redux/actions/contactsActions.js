import * as C from '../constants'
import axios from "axios";
import { api } from "../../components/Constants/constants";

export const getContactList = () => {    
  return function (dispatch) {
    axios
      .post(`${api}/contacts`,userData)
      .then((response) => {
        dispatch({ type: C.getContactList, payload: 'response.data' });
      });
  };
};

export const addContact = (contactName, contactEmail) => {    
    return function (dispatch) {
    //   axios
    //     .post(`${api}/users/create`,userData)
    //     .then((response) => {
          dispatch({ type: C.addContact, payload: 'response.data' });
    //     });
    };
  };

export const deleteContact = (contactEmail) => {    
    return function (dispatch) {
    //     axios
    //     .post(`${api}/users/create`,userData)
    //     .then((response) => {
            dispatch({ type: C.deleteContact, payload: 'response.data' });
        // });
    };
};

export const modifyContact = (contactName, contactEmail) => {    
    return function (dispatch) {
    //     axios
    //     .post(`${api}/users/create`,userData)
    //     .then((response) => {
            dispatch({ type: C.modifyContact, payload: 'response.data' });
        // });
    };
};