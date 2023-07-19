import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectCurrentUserFromUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
import Logo from '../logo/logo.component';
import './homepage.styles.scss';



const Homepage = ()=> {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUserFromUser)
    const [isUser, setUser] = useState({})

    const bg = require("../../assets/home.pictures/background_1.jpg")
    const checkValid = (email)=> {
        if(!email) return false;
        if(email.match('@') && email.match('.')) return true;
        return false;
    }
    
    useEffect(()=>{
        setUser(currentUser)
    }, [currentUser])
    const handleSignOut = ()=>{
        setUser(null)
        dispatch(signOutStart())

    }


    const handleSubmit = (e)=> {
        const formSubmit = e.target;
        const formControl = formSubmit.querySelector('.form-control');
        const notifyOfForm = formSubmit.nextSibling
        if(!checkValid($$.value)){
            e.preventDefault();
            formControl.classList.add('invalid_form');
            notifyOfForm.style.display = 'block';
        }else{
            formControl.classList.remove('invalid_form');
            notifyOfForm.style.display = 'none';
        }
    }
    return(
        <div className='home'>
            <div className='home_header '>
                <div className='home_header-logo'>
                    <Logo />
                </div>
                
                <img className='home_header-background' src={bg} alt="" />
                <div className="home_content">
                
                   <select name="Language" id="language">
                    <option value="VietNam">Vietnamese</option>
                    <option value="English">English</option>
                   </select>
                   {!isUser?
                   <Link to='/login'>
                        <button  className='btn btn-danger btn-signIn'>Đăng Nhập</button>
                   </Link>:
                   <button className='btn btn-danger btn-signIn' onClick={handleSignOut} > Đăng xuất </button>}
                   <div className='home_content_text'>
                    <h1>Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.</h1>
                    <p>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</p>
                    <p>Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</p>
                   </div>
                   {
                   !isUser?
                   < form className ="form-floating" onSubmit={e=>handleSubmit(e)} action='/signUp/registration'>
                        <input type="text" name="email" className='form-control' placeholder = "Enter your email" autoFocus />
                        <label htmlFor="email">Địa chỉ email</label>
                        <button className='btn btn-danger' type='submit'>Bắt Đầu {<FontAwesomeIcon icon={faArrowRight} />} </button>
                   </form> : 
                   <Link to = '/mainHome'>
                         <button className='btn_goFilm'>Vào xem phim thôi</button>
                   </Link>
                  
                   }
                   <div className='notify_form'>&times;  Bạn đã nhập sai điều gì đó</div>
                </div>
            </div>
            
        </div>
    )
    
}


export default Homepage;