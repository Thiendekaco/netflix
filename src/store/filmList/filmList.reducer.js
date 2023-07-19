import { FILM_LIST_ACTION_TYPE } from "./filmList.types";


const INITIAL_STATE = {
    typeListFilm : null,
    current_filmList_all : {},
    current_filmList_movie:{},
    current_filmList_tv:{},
    isLoading: false,
    error : null
}


export const filmListReducer = (state = INITIAL_STATE, action) =>{
    const {type, payload} = action;
    switch(type) {
        case FILM_LIST_ACTION_TYPE.FETCH_FILM_LIST_START :
            return {...state, isLoading: true, typeListFilm: payload};
        case FILM_LIST_ACTION_TYPE.FETCH_FILM_LIST_FAILED:
            return {...state, isLoading: false, error: payload};
        case FILM_LIST_ACTION_TYPE.FETCH_ALL_FILM_LIST_SUCCESS:
            return {...INITIAL_STATE, current_filmList_all: payload}  
        case FILM_LIST_ACTION_TYPE.FETCH_MOVIE_FILM_LIST_SUCCESS:
            return {...INITIAL_STATE, current_filmList_movie: payload}  
        case FILM_LIST_ACTION_TYPE.FETCH_TV_FILM_LIST_SUCCESS:
            return {...INITIAL_STATE, current_filmList_tv: payload}  
        default:
            return {...state} 
    }
}


