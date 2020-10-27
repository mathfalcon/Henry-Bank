import * as C from '../constants'
import axios from "axios";
import { api } from "../../components/Constants/constants";

export const getAllTransactions = ( ) => {  
  return function (dispatch) {
    axios        
      .get(`${api}/transactions/`)      
      .then((response) => {        
        dispatch({ type: C.getAllTransactions, payload: response.data });
      })
      .catch( err => console.log( err ));
  };
};

export const getAllTransactionsById = ( id ) => {  
  return function (dispatch) {
    axios        
      .get(`${api}/transactions/user/${id}`)      
      .then((response) => {        
        dispatch({ type: C.getAllTransactionsById, payload: response.data });
      })
      .catch( err => console.log( err ));
  };
};
