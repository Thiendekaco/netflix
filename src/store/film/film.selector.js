import { createSelector } from "reselect";


export const selecFilmReduce = (state)=>state.film;


export const selectListFilmToSet = createSelector(
    [selecFilmReduce],
    (film) => film.listFilmToSet
)

export const selectListFilmWasLiked = createSelector(
    [selectListFilmToSet],
    (listFilmToSet) =>listFilmToSet.like
)

export const selectListFilmWasAddedWatchList = createSelector(
    [selectListFilmToSet],
    (listFilmToSet) =>listFilmToSet.watchList
)

export const selectInfoBoxIsOpen = createSelector(
    [selectListFilmToSet],
    (listFilmToSet) => listFilmToSet.openInfoBox
)

export const selectProlieListFilmToUser = createSelector(
    [selecFilmReduce],
    (listFilmToSet)=>({like : listFilmToSet.like, watchList : listFilmToSet.watchList})
)