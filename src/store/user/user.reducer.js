import { USER_ACTION_TYPES } from "./user.types";


const INITIAL_STATE = {
    currentUser : null, 
    isloading : false,
    error : null
}


export const userReducer = (state = INITIAL_STATE, action) =>{
    const {type, payload} = action

    switch(type){
        case USER_ACTION_TYPES.SIGN_OUT_START:
        case USER_ACTION_TYPES.SIGN_UP_START:
        case USER_ACTION_TYPES.SIGN_IN_START:
            return{...state, isloading: true};

        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
        case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
            return{...INITIAL_STATE, currentUser: payload};

        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return{...INITIAL_STATE, error: payload};
        
        default:
             return {...state}
    }

}