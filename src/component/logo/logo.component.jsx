import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

import './logo.styles.scss'

const logo = require("../../assets/home.pictures/netflix.png")


const Logo = ()=>{

    return (
        <>
            <FontAwesomeIcon icon={faEarthAmericas} className='icon_logo'/>
            <img src={logo} className='auth_logo' />
        </>

    )
}


export default Logo