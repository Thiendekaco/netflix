import {all, call} from 'redux-saga/effects'
import { userSaga } from './user/user.saga'
import { listFilmSaga } from './filmList/filmList.saga'

export function *rootSaga  (){
   yield all ([
        call(userSaga),
        call(listFilmSaga)
   ])
}

export default rootSaga