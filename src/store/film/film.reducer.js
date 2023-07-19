import FILM_ACTION_TYPES from "./film.type";


const initialStateFilm = {
    listFilmToSet:  {
        like : [],
        watchList: [],
        openInfoBox: null
    },
    error : null
}

export const filmReducer = (state = initialStateFilm, action = {})=>{
    const {type, payload} = action;
    switch(type){
        case FILM_ACTION_TYPES.SET_ADD_FILM_TO_WATCHLIST:
        case FILM_ACTION_TYPES.SET_LIKE_OF_FILM:
        case FILM_ACTION_TYPES.SET_OPEN_INFO_BOX:
        case FILM_ACTION_TYPES.CREATE_LIST_FILM:
            return {...state, listFilmToSet: payload};
        case FILM_ACTION_TYPES.SET_FILM_FAILED:
            return {...state, error: payload};
        default:
            return {...state};
    }
}