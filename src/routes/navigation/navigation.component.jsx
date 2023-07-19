import { Outlet } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

import Logo from "../../component/logo/logo.component"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,  faBell  } from '@fortawesome/free-solid-svg-icons';
import "./navigation.styles.scss"
import { useSelector, useDispatch } from "react-redux";
import { selectUserFromUserReducer } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";
const Navigation = ()=>{
    const [isSearch, setState] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(selectUserFromUserReducer)
    const dispatch = useDispatch();
    
    const handleSignOut = ()=>{
        dispatch(signOutStart())
        if(!user.error){
            navigate('/');
        }
    }
    const handleSearch = ()=>{
        setState(!isSearch)
    }
 
    const handleToggleBox = (e)=>{
        const profileContainer = e.target.className !== 'profile_container' ?  e.target.parentNode : e.target
        const profileBox =  profileContainer.parentNode.querySelector('.profile_box')
        const arrow = profileContainer.querySelector('.arrow');

        arrow.style.transform = arrow.style.transform === 'rotate(0deg)' ? 'rotate(180deg)' : 'rotate(0deg)';
        profileBox.style.display = profileBox.style.display === 'none' ? 'block' : 'none';
    }
    useEffect (()=>{
    
        const handkeScroll = ()=>{
           const navigateContainer = document.querySelector('.navigate_container')
           navigateContainer.style.backgroundColor = window.scrollY>=1.6 ? 'black':'transparent'

        }
        window.addEventListener('scroll', handkeScroll)
        return ()=>{
            window.removeEventListener('scroll', handkeScroll)
        }
    },[])
 return(
    <>
    <div className="navigate_container">
        
        <div className="navigate_container-box-1">
            <div className="navigate_box-logo" >
                <Logo />
            </div>
            <Link to="" className="navigate_link">Home</Link>
            <Link to="typeListFilm/tv" className="navigate_link">TV Shows</Link>
            <Link to="typeListFilm/movie" className="navigate_link">Movies</Link>
            <Link to = "newsPopular" className="navigate_link">New & Popular</Link>
            <Link to="myList" className="navigate_link">My List</Link>
            
        </div>
        <div className="navigate_container-box-2">
            <div className="profile_box">
                <div className="box_item">Manage Profile</div>
                <div className="box_item">Exit Profile</div>
                <div className="box_item">Account</div>
                <div className="box_item">Help Center</div>
                <div className="box_item-main" onClick={handleSignOut}>Sign out of Netflix</div>
            </div>
            <form className="navigate_search-form">
                <FontAwesomeIcon  icon={faMagnifyingGlass} 
                className="navigate_search-icon" 
                onClick={handleSearch}/>
                {isSearch&&<input type="text" 
                className="navigate_search-input"
                placeholder="Search..." />}
              
            </form>
            <FontAwesomeIcon icon={faBell} className="navigate_notify" />
            <div className="profile_container" onClick={e => handleToggleBox(e)} >
                <img src="https://raw.githubusercontent.com/ozbeyahmet1/netflix-remade/main/src/images/profile.png" 
                    className="icon_profile" 
                    alt="profile"
                />
                <div className="arrow" />
            </div>  
    
        </div>
        
    </div>
 
    <Outlet />
    
    </>
 )
}
export default Navigation