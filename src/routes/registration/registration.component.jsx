import './registration.styles.scss'
import Logo from '../../component/logo/logo.component';
import { Link, useLocation } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import { useState, useEffect } from 'react';


const Registration = ()=>{
    const location = useLocation()
    const [Doc, setDoc] = useState(null);
    const getDoc =  async() =>{
        const Arr = await getCategoriesAndDocuments("SignUpPage");
        setDoc(Arr[1]);
        
    }
    useEffect(()=>{
        getDoc();
    },[])

    return(
        Doc && <div className="registration_container">
            <div className='signUp_header'>
                <Link className='signUp_header-logo' to='/'>
                    <Logo />
                </Link>
                <Link to='/login' className='signUp_header-sigin'>Đăng Nhập</Link>
            </div>
            <hr />
            <div className='registration_content'>
                <div className='registration_box'>
                    <img className='registration_image' src = {Doc.image} />
                    <span className='registration_step'>Buớc 1/3</span>
                    <h3 className='registration_title'>{Doc.title}</h3>
                    <span className='registration_detail'>{Doc.detail}</span>
                    <Link to={`/signUp/reform${location.search}`}>
                        <button className='registration_btn'>Tiếp theo</button>
                    </Link>
                </div>
            </div>

        </div>
    )
    
}

export default Registration;