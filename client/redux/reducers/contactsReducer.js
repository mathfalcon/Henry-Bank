import * as C from "../constants";

const initialState = {
    contacts:[],
    response:"" ,
  };

  function contactsReducer(state = initialState, action) { 
    switch (action.type) {
      case C.getContactList: {       
        return { ...state, contacts: action.payload.contacts };
      }  
    
      case C.addContact: {          
        return { ...state, response: action.payload };
      }
  
      case C.deleteContact: {             
        return { ...state, response: action.payload };
      }

      case C.modifyContact: {           
        return { ...state, response: action.payload };
      }
  
      default:
        return state;
      }
  }
  export default contactsReducer;