import { createSelector } from 'reselect';


export const selectListFilmReducer = (state) => state.listFilm;


export const selectCurrentListFilmAll = createSelector(
    [selectListFilmReducer],
    (listFilms) =>listFilms.current_filmList_all
)
export const selectCurrentListFilmTv = createSelector(
    [selectListFilmReducer],
    (listFilms) =>listFilms.current_filmList_tv
)
export const selectCurrentListFilmMovie = createSelector(
    [selectListFilmReducer],
    (listFilms) =>listFilms.current_filmList_movie
)

export const selectStateFetchListFilm = createSelector(
    [selectListFilmReducer],
    (listFilms) => listFilms.isLoading
)

export const selectStateToTypeOfListFilm = createSelector(
    [selectListFilmReducer],
    (listFilms) => listFilms.typeListFilm
)