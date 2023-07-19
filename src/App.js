
import {Routes, Route, redirect} from 'react-router-dom';



import { checkUserSession } from "./store/user/user.action";
import { useEffect } from "react";
import {useDispatch} from 'react-redux';


import Home from "./routes/home/home.component";
import AuthenticationSignIn from "./routes/authentication/sign_In/authentication_signIn.component";
import HomeFilm from "./routes/homeFilm/homeFilm.component";
import Navigation from "./routes/navigation/navigation.component";
import Reform from "./routes/reform/reform.component";
import AuthenticationSignUp from "./routes/authentication/sign_Up/authentication_signUp.comcopnent";
import MyList from "./routes/myList/myList.component";
import NewPopular from "./routes/newPopular/newPopular.component";
import TypeListFIlms from "./routes/typeListFilm/typeListFIm.component";
import Registration from "./routes/registration/registration.component";
import Confirm from './routes/confirm/confirm.component';

import { useSelector } from 'react-redux';
import { selectCurrentUserFromUser } from './store/user/user.selector';
import { selectListFilmToSet } from './store/film/film.selector';
import { creatListFilm } from './store/film/film.action';
function App() {
  
  
  const listFilm = useSelector(selectListFilmToSet)
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    dispatch(checkUserSession())
  }, []) 
  
  const currentUser = useSelector(selectCurrentUserFromUser)
  useEffect (()=>{
    if(currentUser){
      dispatch(creatListFilm(currentUser.listOfUser))
    }
  },[currentUser])

  return (
    <Routes>
      <Route>
        <Route path="/" index element = {<Home/>} />
        <Route path="/login" element= {<AuthenticationSignIn />} />
        <Route path ="/signUp/*" element = {<AuthenticationSignUp />} >
          <Route path= "registration" element = {<Registration />} />
          <Route path= "reform" element={<Reform />} />
          <Route path="confirm" element={<Confirm/>} />
        </Route>
      </Route>
      
      
      {currentUser && 
        <Route path="/mainHome/*" element = {<Navigation />} >
          <Route index element = {<HomeFilm/>}/>
          <Route path="typeListFilm/*" element={<TypeListFIlms />} />
          <Route path = "newsPopular" element={<NewPopular/>} />
          <Route path="myList" element={<MyList />} />
        </Route>
      }

    
    </Routes>
     
  )
}

export default App;

