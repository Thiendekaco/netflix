import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.util";


export const checkUserSession = ()=>(
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
)



export const signInStart = (email, password) =>createAction(USER_ACTION_TYPES.SIGN_IN_START, {email, password})

export const signInFailed = (error) =>createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)




export const signUpStart = (email, password) =>createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password})

export const signUpFailed = (error) =>createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)

export const signUpSuccess = (user, additionalDetails) =>createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalDetails})




export const signOutStart = () =>createAction(USER_ACTION_TYPES.SIGN_OUT_START)

export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)

