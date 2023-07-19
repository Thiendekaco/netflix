import { createAction } from "../../utils/reducer/reducer.util";
import { FILM_LIST_ACTION_TYPE } from "./filmList.types";



export const fetchFilmAllListStart = (typeOfListFilm)=> createAction(FILM_LIST_ACTION_TYPE.FETCH_FILM_LIST_START, typeOfListFilm);



export const fetchFilmListAllSuccess = (films) => createAction(FILM_LIST_ACTION_TYPE.FETCH_ALL_FILM_LIST_SUCCESS, films);
export const fetchFilmListTVSuccess = (films) => createAction(FILM_LIST_ACTION_TYPE.FETCH_TV_FILM_LIST_SUCCESS, films);
export const fetchFilmListMovieSuccess = (films) => createAction(FILM_LIST_ACTION_TYPE.FETCH_MOVIE_FILM_LIST_SUCCESS, films);

export const fetchFilmListFailed = (error) => createAction(FILM_LIST_ACTION_TYPE.FETCH_FILM_LIST_FAILED, error);