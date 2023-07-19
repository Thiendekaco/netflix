import { faExplosion } from "@fortawesome/free-solid-svg-icons"
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './confirm.styles.scss';
import Logo from '../../component/logo/logo.component';
import { Link, useNavigate } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import { useState, useEffect } from 'react';
import { signOutStart } from "../../store/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromUserReducer } from "../../store/user/user.selector";


const Confirm = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user =  useSelector(selectUserFromUserReducer)
    const [Doc, setDoc] = useState(null);
    const getDoc =  async() =>{
        const Arr = await getCategoriesAndDocuments("SignUpPage");
        setDoc(Arr[0]); 
    }
    useEffect(()=>{
        getDoc();
    },[])
    const handleSignOut = ()=>{
        dispatch(signOutStart())
        if(user.error) return;
        navigate('/');
    }
    return(
        Doc&&
        <div className="confirm_container">
            <div className='signUp_header'>
                <Link className='signUp_header-logo' to='/'>
                    <Logo />
                </Link>
                <div className='signUp_header-sigin' onClick={handleSignOut}>Đăng Xuất</div>
            </div>
            <hr />
            <div className='confirm_content'>
                <div className='confirm_box'>
                    <FontAwesomeIcon className='confirm_image' icon={faCircleCheck} />
                    <span className='confirm_step'>Buớc 3/3</span>
                    <h3 className='confirm_title'>{Doc.title}</h3>
                    <span className='confirm_detail'>{Doc.detail}</span>
                    <Link to='/mainHome'>
                        <button className='confirm_btn' type='submit'>Bắt đầu thôi</button>
                    </Link>
                </div>
            </div>

        </div>
    )

}

export default Confirm;