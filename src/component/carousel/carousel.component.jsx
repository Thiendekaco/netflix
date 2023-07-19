import { useEffect, useState } from "react"
import {  image_url } from "../../utils/api/api.util"
import './carousel.styles.scss'
import { useSelector, useDispatch } from "react-redux";

import { selectListFilmToSet } from "../../store/film/film.selector";
import { findGenerFilm } from "../../utils/api/api.util";
import Spinner from "../spinner/spinner.component";
import { setLikeOfFilm, addFilmToWatchList, openInforBox } from "../../store/film/film.action";
import { BtnAddWatchList, BtnLikeHeart, BtnPlayCircle } from "../button/button.component";

import { selectCurrentUserFromUser } from "../../store/user/user.selector";




const  Carousel = (props) =>{
    const dispatch = useDispatch()
    const filmList = props.listFilm
    const currentUser = useSelector(selectCurrentUserFromUser)
    const filmListofInterest = useSelector(selectListFilmToSet)
    const [docs, setDoc] = useState([])
    const [indexSlide, setIndexSlides] = useState(0);
   

    useEffect( ()=>{
        setDoc(filmList[props.title])
    })

    const handlButtonFlip = (e)=>{
        const btnOfSlide = e.target;
        if(btnOfSlide.className === 'control_pre'){
            if(indexSlide!== 0){
                setIndexSlides(indexSlide - 1)
            }else{
                setIndexSlides(indexSlide + 3)
            }
        }else{
            if(indexSlide!== 3){
                
                setIndexSlides(indexSlide + 1 )
            }else{
                setIndexSlides(0)
            }
            
        }
        
    }
    const findParentOfEventTag = (e)=>{
        const idOfFilmInFilmPosterBox = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
        const filmIsSelected = docs ? docs.find((value) => value.id === parseInt(idOfFilmInFilmPosterBox)) : {}

        return filmIsSelected? filmIsSelected : {}
    }

    const handleSetLikeOfFilm = (e) =>{
        
        const filmIsSelected = findParentOfEventTag(e)
        dispatch(setLikeOfFilm(filmIsSelected, filmListofInterest, currentUser.id))
          
    }
    const handleSetWatchList = (e) =>{
        const filmIsSelected = findParentOfEventTag(e)
        dispatch(addFilmToWatchList(filmIsSelected, filmListofInterest, currentUser.id))  
    }

    const handleOpenInfoBox = (e) =>{
        const filmIsSelected = findParentOfEventTag(e)
        dispatch(openInforBox(filmIsSelected, filmListofInterest))  
    }
    const setEffectBtnLike = (id)=>{
        if(filmListofInterest && filmListofInterest.like){
            return filmListofInterest.like.find((d)=> id === d.id);
        }
        return false;
    }
    const setEffectBtnAddWatchList = (id)=>{
        if(filmListofInterest && filmListofInterest.watchList){
            return  filmListofInterest.watchList.find((d)=> id === d.id);
        }
        return false;
    }
    return (
        <div className="carousel_container">
                <button className="control_pre" onClick={e=>handlButtonFlip(e)}>❮</button>
                    {
                        docs&& docs.filter((_,index) => (5*indexSlide<=index && index< 5*(indexSlide+1)))
                        .map( doc =>{
                            const EffectBtnLike = setEffectBtnLike(doc.id)
                            const EffectBtnAddWatchList = setEffectBtnAddWatchList(doc.id)
                            return(
                             <div className="film_poster_box" key={doc.id} id={doc.id}>
                            {
                            doc.poster_path?<div className="film_poster" style={{backgroundImage : `url(${image_url + doc.poster_path})`}}>
                                    <div className="film_poster_features">
                                        <div className="film_poster_porperties">
                                            <BtnPlayCircle onClick={e=>handleOpenInfoBox(e)} />
                                            <BtnLikeHeart onClick = {e => handleSetLikeOfFilm(e)} effect ={EffectBtnLike}/>
                                            <BtnAddWatchList onClick = {e => handleSetWatchList(e)} effect = {EffectBtnAddWatchList}/>
                                        </div>
                                        <span className="film_poster_title">{doc.title|| doc.name}</span>
                                        <div className="film_gener_box">
                                        {
                                            
                                            findGenerFilm(doc.genre_ids).map((d, index)=>(
                                                <p key={index} className="film_poster_gener">{d}</p>
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>: <Spinner />
                            }
                         </div> 
                            )
                        }

                        )
                    }
                <button className="control_next"onClick={e=>handlButtonFlip(e)}>❯</button>
        </div>
    )

}

export default Carousel