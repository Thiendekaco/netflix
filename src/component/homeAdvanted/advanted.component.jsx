import { useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import Collapse_box from '../collapse_box/collapse_box.component';
import Footer from '../footer/footer.component';
import './advanted.styles.scss'


const Advanted = ()=>{
    const [arrDoc, setArrDoc] = useState([]);
    const getDoc =  async() =>{
        setArrDoc(await getCategoriesAndDocuments("Home"));
    }
    useEffect(()=>{
        getDoc();
    },[])
    return(
        <div className='home_contents'>
                {arrDoc ? arrDoc.map(({description, pictures, title, video}, index) =>{
                    
                    return(
                        <div className={`content  ${index % 2 !== 0?'content_row1': '' }`} key={index}>
                            <div className='content_text' >   
                                <h1>{title}</h1>
                                <p>{description}</p>
                            </div>
                            <div className='content_image'>
                               {
                                pictures.length === 2 ? 
                                    <>
                                        <img  src={pictures[0]} alt={pictures[0]} className={`pic_00`}/>
                                        <div className='home_box_picture'>
                                          <img src={pictures[1]} alt={pictures[1]} className={`pic_01`} />
                                          <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" className='icon_gif'></img>
                                        </div>
                                    </>
                                 : 
                                    <>
                                        <img className='pic_0' src={pictures[0]} alt={pictures[0]}/>
                                      
                                        <video src={video}  alt={video} 
                                            className={`video_${index}`}  
                                            autoPlay 
                                            playsInline 
                                            loop muted/>
                                     
                                        
                                    </> 
                                }
                            </div>
                        </div>
                    )  
                }):<></>}
                <div className='content'>
                    <h1 className='title_collapse_box'>Câu hỏi thường gặp</h1>
                    <Collapse_box/>    
                </div>
                <div className='content'>
                    <Footer />
                </div>
            
        </div>
    )
}

export default Advanted;
