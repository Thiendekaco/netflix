

import { useEffect, useState } from "react";
import "./homeFilm.styles.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from "react-redux";
import Spinner from "../../component/spinner/spinner.component";
import InfoBox from "../../component/inForBox/inForBox.component";
import Carousel from "../../component/carousel/carousel.component";
import requests from "../../utils/api/request";
import { image_url } from "../../utils/api/api.util";
import { selectCurrentListFilmAll } from "../../store/filmList/filmList.selector";

import Footer from "../../component/footer/footer.component";
import { selectInfoBoxIsOpen } from "../../store/film/film.selector";
import { fetchFilmAllListStart } from "../../store/filmList/filmList.action";
import { selectListFilmToSet } from "../../store/film/film.selector";
import { openInforBox } from "../../store/film/film.action";
const HomeFilm = () =>{
    const isOpenInfoBox = useSelector(selectInfoBoxIsOpen)
    const filmListofInterest = useSelector(selectListFilmToSet)
    const listFilm = useSelector(selectCurrentListFilmAll)
    const [docs, setDoc] = useState(undefined)
    const dispatch = useDispatch();
    
    useEffect(()=>{
      setDoc(listFilm ? listFilm.Trending_Now : undefined)
    }, [listFilm])
    useEffect(()=>{
      dispatch(fetchFilmAllListStart("url"))
    },[])
   
    const handleOpenInfoBox = ()=>{
        dispatch(openInforBox(docs[3], filmListofInterest))
    }

    return (
        <>
        {docs? <div className="homeFilm"> 
            <div className="homeFilm_header" id = {docs[3].id}>
                <img src={`${image_url + docs[3].backdrop_path}`} 
                alt='homeFilm_backDrop' 
                className="homeFilm_backDrop"/>
                <div className="film_info" >
                    <h1 className="film_info-title">{docs[3].title}</h1>
                    <p className="film_info-overview">{docs[3].overview}</p>
                    <button className="film_info-button" onClick={e => handleOpenInfoBox(e)}>
                        <FontAwesomeIcon icon={faCircleInfo} className="film_info-icon"/>
                        More info
                    </button>
                </div>
            </div>
      
            <div className="homeFIlm_content" >
                    {
                        Object.values(requests).map((doc, index) =>(
                            <div className="homeFilm_box" key={index}>
                                    <h3 className= "film_type">{doc.title.replace("_"," ")}</h3>
                                    <Carousel title = {doc.title} index={index} listFilm={listFilm}/>
                            </div>
                        ))
                    }
                    <hr />
                    <Footer className="footer"/>
            </div>
            
        </div> :  <Spinner />}
        {isOpenInfoBox && <InfoBox />}
        
        </>
        
    )
}

export default HomeFilm