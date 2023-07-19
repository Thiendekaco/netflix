import './inForBox.styles.scss';

import YouTube from 'react-youtube';
import { useState, useEffect, useRef} from 'react';
import movieTrailer from 'movie-trailer';
import { selectInfoBoxIsOpen, selectListFilmToSet } from '../../store/film/film.selector';
import { useDispatch, useSelector } from 'react-redux';
import { BtnSetVolume, BtnAddLargeWatchList, BtnPlayLarge, BtnCloseInfoBox } from '../button/button.component';
import { openInforBox } from '../../store/film/film.action';
import requests from '../../utils/api/request';

const InfoBox = () =>{
    const inFoBox = useSelector(selectInfoBoxIsOpen)
    const dispatch = useDispatch()
    const filmListofInterest = useSelector(selectListFilmToSet)
    
    const [videoTrailer, setVideoTrailer] = useState('')
    const [isPaused, setIsPaused] = useState(false)
    const [isMute, setIsMute] = useState(false)
    const fetchVideoTrailed = async()=>{
      await movieTrailer(`${inFoBox.title || inFoBox.original_name}`,{multi: true})
      .then(response => setVideoTrailer(new URL(response[0]).searchParams.get('v')))
      .catch(error => console.log(error))
    }
    const _body = document.querySelector('body');
    _body.style.overflow = InfoBox ? 'hidden' : 'overflow';
    useEffect(()=>{
      fetchVideoTrailed();
    }, [inFoBox])
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        controls : 0,
        autoplay: 1,
        rel : 0,
        showinfo: 0,
        loop: 1
      },
 
    };
    let videoElement = useRef(undefined) ;
    const _onReady = (e)=>{
      videoElement.current = e.target
    }
    
    const handlePauseClick = ()=>{
      setIsPaused(!isPaused)
    }
    
    const handleMuteCLick  = ()=>{
      setIsMute(!isMute)
    }
    const handleCloseInfoBox =()=>{
        dispatch(openInforBox(inFoBox, filmListofInterest));
        _body.style.overflow = 'scroll';
    }

    useEffect(()=>{
      if(videoElement.current){
        isPaused ? videoElement.current.pauseVideo() : videoElement.current.playVideo()
        isMute ? videoElement.current.mute() : videoElement.current.unMute()
      }

    }, [isPaused, isMute])

 
    return(
      <div className='InfoBox_container'>
        <div className='InfoBox_box'>
            <div className='InfoBox_videoTrailer'>
              <YouTube videoId={videoTrailer}  opts={opts}  className='InfoBox_Video' onReady={e => _onReady(e)}/>
              <div className='InfoBox_mask'>
                
                <div className='InfoBox_btngroup'>
                  <BtnPlayLarge onClick={()=>handlePauseClick()} className="BtnPLaytLarge"  effect= {isPaused}/>
                  <BtnAddLargeWatchList className="BtnAddWatchList"/>
                </div>

                <BtnSetVolume onClick = { () => handleMuteCLick()} effect = {isMute} className="BtnSetVolume"/>
                <BtnCloseInfoBox className="BtnCloseInfoBox" onClick={()=>handleCloseInfoBox()}/>
              </div>
            </div>
            <div className='InfoBox_description'>
              <div className='InfoBox_description-header'>
                <h4 className='header-title'>{inFoBox.title|| inFoBox.name}</h4>
                <span className='header-details'>{inFoBox.overview}</span>
              </div>
              <hr />
              <div className='InfoBox_description-footer'>
                <h4 className='footer_infoOfFilm'>Info of Film</h4>
                <div className='footer_detaliOfFilm'>
                  <span className='footer_originalLanguage'>Realease date:  
                    <span style={{color:'white'}}>
                    {" "+inFoBox.release_date}
                    </span>
                  </span>
                  <br />
                  <span className='footer_originalLanguage'>Score:  
                    <span style={{color:'white'}}>
                    {" "+inFoBox.vote_average}
                    </span>
                  </span>
                  <br/>
                  <span className='footer_generOfFilm' >Geners: 
                    <span style={{color : 'white'}}>    {
                        inFoBox.genre_ids.map((genner)=>{
                          let title;
                          if(Object.values(requests).some(
                            doc => { if(doc.genner && (doc.genner.genner_movie === genner
                              ||doc.genner.genner_tv === genner)){title = doc.title ; return true}
                            return false;
                            })
                          ){
                            return title.replace("_", " ") ;
                          }
                        })
                    }</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}


export default InfoBox