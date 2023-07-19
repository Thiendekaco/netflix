import {put, takeLatest, all, call, take, takeLeading} from 'redux-saga/effects';
import { FILM_LIST_ACTION_TYPE } from './filmList.types';
import { 
    fetchFilmListFailed,
    fetchFilmListAllSuccess,
    fetchFilmListTVSuccess,
    fetchFilmListMovieSuccess
} from './filmList.action';

import { onGetData } from '../../utils/api/api.util';





export function * onFetchListFlim ({payload : typeListFilm}){
    try{
        const listFilm = yield call(onGetData, typeListFilm);
        switch(typeListFilm){
            case "url":{
                yield put(fetchFilmListAllSuccess(listFilm))
                break;
            };
            case "url_tv":{
                yield put(fetchFilmListTVSuccess(listFilm))
                break;
            };
            case "url_movie":{
                yield put(fetchFilmListMovieSuccess(listFilm))
                break;
            };        
        }
        
    }catch(error){
        yield put(fetchFilmListFailed(error))
    }
}


export function * onFetchFlimListStart (){
    yield takeLatest (FILM_LIST_ACTION_TYPE.FETCH_FILM_LIST_START, onFetchListFlim )
}


export function * listFilmSaga (){
    yield all([call(onFetchFlimListStart)])
}