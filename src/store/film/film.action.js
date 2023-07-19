import { createAction } from "../../utils/reducer/reducer.util";

import { updatePropertiesOfUser } from "../../utils/firebase/firebase.util";
import FILM_ACTION_TYPES from "./film.type";




const handleSetLikeOfFilm = (filmToSet, listFilmToSet )=>{

    return  listFilmToSet.like.find(value=> value.id === filmToSet.id) ? 
    {...listFilmToSet, 
        like:listFilmToSet.like.filter(value => value.id !== filmToSet.id )}:
    {...listFilmToSet, 
        like: [...listFilmToSet.like, filmToSet]};
    

}
const handleSetWatchList = (filmToSet, listFilmToSet )=>{
   
    return listFilmToSet.watchList.find(value=> value.id === filmToSet.id)? 
    {...listFilmToSet,
        watchList: listFilmToSet.watchList.filter(value => value.id !== filmToSet.id )}:
    {...listFilmToSet, 
        watchList: [...listFilmToSet.watchList, filmToSet]};


}
const handleOpenInfoBox = (filmToOpen, listFilmToSet ) =>{
    
    return listFilmToSet.openInfoBox === filmToOpen ? 
    {...listFilmToSet,openInfoBox : null }: 
    {...listFilmToSet,openInfoBox : filmToOpen};
}



export const setLikeOfFilm = (filmToSet,listFilmToSet, userId)=> {
    const newFilmToSet = handleSetLikeOfFilm(filmToSet, listFilmToSet)
     updatePropertiesOfUser(userId, newFilmToSet) 

    return createAction(FILM_ACTION_TYPES.SET_LIKE_OF_FILM, newFilmToSet )
}

export const addFilmToWatchList = (filmToSet, listFilmToSet, userId) => {
    const newFilmToSet = handleSetWatchList(filmToSet, listFilmToSet)
     updatePropertiesOfUser(userId, newFilmToSet) 

    return  createAction(FILM_ACTION_TYPES.SET_ADD_FILM_TO_WATCHLIST,newFilmToSet)
}

export const openInforBox = (filmToOpen, listFilmToSet) =>{
    const newFilmToOpen = handleOpenInfoBox(filmToOpen,listFilmToSet)
    return  createAction(FILM_ACTION_TYPES.SET_OPEN_INFO_BOX,newFilmToOpen)
}


export const creatListFilm = (listFilmToAdd) =>{
    return createAction(FILM_ACTION_TYPES.CREATE_LIST_FILM, 
    {like : listFilmToAdd.like, watchList : listFilmToAdd.watchList, openInfoBox: null})
}

export const setFilmWasEroor = (error) =>createAction(FILM_ACTION_TYPES.SET_FILM_FAILED, error)