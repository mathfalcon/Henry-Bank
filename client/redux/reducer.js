import * as C from './constants'

const initialState = {    
  users:[]   
}


function rootReducer(state = initialState, action) {
    switch (action.type) {       
         case C.GET_USERS: {
            return { ...state, users:action.payload }
        }
         default: return state;
    }
}

export default rootReducer;
