import './typeFilm.styles.scss'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import Spinner from "../../component/spinner/spinner.component";
import InfoBox from "../../component/inForBox/inForBox.component";
import Carousel from "../../component/carousel/carousel.component";
import requests from "../../utils/api/request";
import { image_url } from "../../utils/api/api.util";
import { selectCurrentListFilmMovie, selectCurrentListFilmTv } from "../../store/filmList/filmList.selector";

import Footer from "../../component/footer/footer.component";
import { selectInfoBoxIsOpen } from "../../store/film/film.selector";
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchFilmAllListStart } from '../../store/filmList/filmList.action';
import { selectListFilmToSet } from "../../store/film/film.selector";
import { openInforBox } from "../../store/film/film.action";

const TypeFilm = () =>{
    const param = useParams();
    const dispatch = useDispatch();

    const isOpenInfoBox = useSelector(selectInfoBoxIsOpen)
    const filmListofInterest = useSelector(selectListFilmToSet)
    const listFilm = param.typeFilm === 'tv' ? useSelector(selectCurrentListFilmTv) 
    : useSelector(selectCurrentListFilmMovie)
    const [docs, setDoc] = useState(undefined)

    useEffect(()=>{
        dispatch(fetchFilmAllListStart(`url_${param.typeFilm}`))
    },[param.typeFilm])
    useEffect(()=>{
      setDoc(listFilm ? listFilm.Trending_Now : undefined)
    }, [listFilm])


    const handleOpenInfoBox = ()=>{
        dispatch(openInforBox(docs[1], filmListofInterest))
    }
    
    return (
        <>
        {docs? <div className="typeFilm"> 
            <div className="typeFilm_header">
                <img src={`${image_url + docs[1].backdrop_path}`} 
                alt='typeFilm_backDrop' 
                className="typeFilm_backDrop"/>
                <div className="film_info" >
                    <h1 className="film_info-title">{docs[1].title}</h1>
                    <p className="film_info-overview">{docs[1].overview}</p>
                    <button className="film_info-button" onClick={handleOpenInfoBox}>
                    <FontAwesomeIcon icon={faCircleInfo} className="film_info-icon"/>
                        More info</button>
                </div>
            </div>
      
            <div className="typeFIlm_content" >
                    {
                        Object.values(requests).map((doc, index) =>(
                            <div className="typeFilm_box" key={index}>
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

export default TypeFilm;