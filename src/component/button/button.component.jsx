
import './button.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlayCircle, faHeart, faXmarkCircle} from '@fortawesome/free-regular-svg-icons';
import {faPlay, 
    faCirclePlus, 
    faVolumeHigh, 
    faPause,
    faVolumeMute} from '@fortawesome/free-solid-svg-icons'




export const BtnPlayLarge = (props)=>(
    <button className='BtnPlayLarge'onClick={props.onClick}>
        <FontAwesomeIcon icon={props.effect ? faPlay  : faPause } className='icon' />
        {props.effect ? 'Play' : 'Pause'}
    </button>
)

export const BtnPlayCircle = (props)=>(
    <button className='BtnPlayCircle' >
         <div className='BtnHandle' onClick={props.onClick}/>
        <FontAwesomeIcon icon={faPlayCircle} className='icon'/>
    </button>
)

export const BtnLikeHeart = (props) =>(
    <button className='BtnLikeHeart' >
        <div className='BtnHandle' onClick={props.onClick}/>
        <FontAwesomeIcon icon={faHeart} className='icon' style={{color : props.effect ? '#e71e1e' : 'white' }}/>
    </button>
)

export const BtnAddWatchList = (props) =>(
    <button className='BtnAddWatchList'>
        <div className='BtnHandle' onClick={props.onClick}/>
        <FontAwesomeIcon icon={faCirclePlus} className='icon' style={{color : props.effect ? '#e71e1e' : 'white' }} />
    </button>
)

export const BtnSetVolume = (props) =>(
    <button className='BtnSetVolume'>
        <div className='BtnHandle' onClick={props.onClick}/>
        <FontAwesomeIcon icon={props.effect ?faVolumeMute : faVolumeHigh} className='icon' />
    </button>
)

export const BtnAddLargeWatchList = (props) =>(
    <button className='BtnAddLargeWatchList'>
        <div className='BtnHandle' onClick={props.onClick}/>
        <FontAwesomeIcon icon={faCirclePlus} className='icon'style={{color : props.effect ? '#e71e1e' : 'white' }} />
    </button>
)
export const BtnCloseInfoBox= (props) =>(
    <button className='BtnCloseInfoBox'>
        <div className='BtnHandle' onClick={props.onClick}/>
        <FontAwesomeIcon icon={faXmarkCircle} className='icon'/>
    </button>
)