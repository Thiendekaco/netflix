import {combineReducers} from 'redux'
import { userReducer } from './user/user.reducer';
import { filmListReducer } from './filmList/filmList.reducer';
import { filmReducer } from './film/film.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    listFilm : filmListReducer,
    film : filmReducer
});

export default rootReducer