import {takeLatest, put, all, call} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';
import {
        signInFailed,
        signInSuccess,
        signOutFailed,
        signOutSuccess,
        signUpFailed,
        signUpSuccess
} from './user.action';
import { createAuthUserWithEmailAndPassword,
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword,
        signOutUser,
        getCurrentUser,
 } from '../../utils/firebase/firebase.util.js'




export function* getSnapshotFromUserAuth (userAuth, additionalDetails){
    try{
        const userSnapshot = yield call(
                createUserDocumentFromAuth, 
                userAuth, 
                additionalDetails)
        console.log('userSnapshot',userSnapshot)
        yield put(signInSuccess({id: userSnapshot.id,...userSnapshot.data() }) )
        
    }catch(error){
        yield put(signInFailed(error))
    }

}  
export function * isUserAuthenticated (){
    try{
        const user = yield call(getCurrentUser)
        if(!user) return;
        yield call(getSnapshotFromUserAuth, user)
    }catch(error){
        yield put(signInFailed(error))
    }
}
export function * checkUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}


export function * signIn ({payload: {email, password}}){
    try{
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
        if(!user) return;
        yield call(getSnapshotFromUserAuth,user)
    }catch(error){
        yield put(signInFailed(error))
    }
}
export function * onSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signIn)
}



export function * signOut (){
    try{
        
        yield call(signOutUser)
        yield put(signOutSuccess())  
    }catch(error){
        yield put(signOutFailed(error)) 
    }
} 
export function* onSignOutStart (){
    yield takeLatest (USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function * signUp ({payload : {email, password}}){
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, {}))

    }catch(error){
        yield put(signUpFailed(error))
    }
}
export function* afterSignUp({payload : {user, additionalDetails}}){
   try{
      yield call( getSnapshotFromUserAuth,user, additionalDetails)
   }catch(error){
      yield put(signUpFailed(error));
   }
}
export function * onSignUpStart (){
    yield takeLatest (USER_ACTION_TYPES.SIGN_UP_START, signUp)
}
export function * onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, afterSignUp)
}

export function* userSaga(){
    yield all([
        call(checkUserSession),
        call(onSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
} 










 