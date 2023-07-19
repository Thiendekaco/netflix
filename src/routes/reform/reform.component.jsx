import './reform.styles.scss'
import Logo from '../../component/logo/logo.component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signUpStart } from '../../store/user/user.action';
import { selectUserFromUserReducer}from '../../store/user/user.selector';


let demoMessage = [1,2,3];
const Reform = () =>{
    
    const location = useLocation();
    const naviage = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUserFromUserReducer)
    const defaultEmail = location.search.replace('?email=', '').replace('%40', '@')

    const [Doc, setDoc] = useState(null);
    const [message, setMessage] = useState([1,2,3])
    const [formField, setFormField] = useState({email : defaultEmail, password: ''})
    const {email, password} = formField

    const getDoc =  async() =>{
        const Arr = await getCategoriesAndDocuments("SignUpPage");
        setDoc(Arr[2]); 
    }
    useEffect(()=>{
        getDoc();
    },[])
   
    const checkValid = (e) =>{
        const formInput = e.target.querySelectorAll('.form_input')
        const checkboxContainer = e.target.querySelector('.checkbox_container')
        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            formInput[0].classList.add('invalid_form');
            demoMessage[0] = 'Email của bạn chưa đúng định dạng'
        }

        if(!(checkboxContainer.querySelector('.form_checkBox').checked)){
            checkboxContainer.querySelector('.checkmark').classList.add('invalid_form')
            demoMessage[1] = 'checkBox chưa được check'
        }else{
            checkboxContainer.querySelector('.checkmark').classList.remove('invalid_form')
            demoMessage[1] = 2
        }
        
        if(!(password.length >= 8)){
            formInput[1].classList.add('invalid_form');
            demoMessage[2] = 'Mật khẩu của bạn phải tối thiểu 8 ký tự'  
        }else{
            formInput[1].classList.remove('invalid_form');
            demoMessage[2] = 0
        }
        if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            formInput[0].classList.remove('invalid_form');
            demoMessage[0] = 0
            if(password.length >= 8){
                if((checkboxContainer.querySelector('.form_checkBox').checked)){
                    checkboxContainer.querySelector('.checkmark').classList.remove('invalid_form')
                    formInput[1].classList.remove('invalid_form');
                    setMessage(demoMessage) ;
                    return true
                }
            }
        }
        setMessage(demoMessage)
        return false;
    }
  
    const incorrectAccount = (e)=>{
        const formInput = e.target.querySelectorAll('.form_input')
        formInput[0].classList.add('invalid_form');
        demoMessage[0] = 'Email của bạn đã được sử dụng'
        setMessage(demoMessage)
    }
    const handleOnchange = (e)=>{
        setFormField({...formField, [e.target.id] : e.target.value})
    }

    const handleSubmitFormField = (e)=>{
        e.preventDefault()
            if(checkValid(e)){
                 dispatch(signUpStart(email, password));
                if(user.error && user.error.code === 'auth/email-already-in-use'){
                    incorrectAccount(e)
                }else{
                    naviage('/signUp/confirm');
                }
            }
         
    }

    return(
        Doc&&
        <div className="reform_container">
            
            <div className='signUp_header'>
                <Link className='signUp_header-logo' to='/'>
                    <Logo />
                </Link>
                <Link to='/login' className='signUp_header-sigin'>Đăng Nhập</Link>
            </div>
            <hr />
            <div className='reform_content'>
                <div className='reform_box'>
                    <span className='reform_step'>Buớc 2/3</span>
                    <h3 className='reform_title'>{Doc.title}</h3>
                    <span className='reform_detail'>{Doc.detail}</span>
                    <form  onSubmit={e =>handleSubmitFormField(e)}>
                        <div className='form_group'>
                            <input type='text' id='email' className='form_input ' 
                            placeholder='      '
                            autoFocus
                            onChange={e =>handleOnchange(e)}
                            value={email}
                            required/>
                            <label htmlFor='email' className='form_label'>Email</label>
                        </div>
                        <div className='form_group'>
                            <input type='password' id='password'
                            placeholder='     '
                            className='form_input' 
                            onChange={e =>handleOnchange(e)}
                            value={password}
                            required/>
                            <label htmlFor='password' className='form_label'>Mật khẩu </label>
                        </div>
                        <label className='checkbox_container'>
                            <input type="checkbox" id='checkbox' className='form_checkBox' />
                            <div className='checkmark'></div> 
                            Bạn đồng ý với các điều khoản của Netflix
                        </label>
                        { 
                            message&&message.map((doc, index)=>{
                                if(typeof doc !== 'number'){
                                    return(<div className='notify_form' key={index}>&times; {doc}</div>)
                                }
                            })
                        }
                        <button className='reform_btn' type='submit'>Tiếp theo</button>   
                    </form>
                </div>
            </div>
            
        </div>
    )
}


export default Reform