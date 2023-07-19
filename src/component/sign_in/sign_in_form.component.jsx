import './sign_in_form.styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInStart } from '../../store/user/user.action';


const defaultFormField = {
    password : '',
    email: ''
}
const defauMessage = {
    bool : false,
    message : ''
}

const SignIn = () =>{
    const [formField, setFormField] = useState(defaultFormField)
    const [{bool, message}, setErrorMessage] = useState(defauMessage)
    const naviagate = useNavigate()
    const {password, email} = formField
    const handleInput = (e) =>{
        setFormField({...formField, [e.target.name] : e.target.value})
    }
    const dispatch = useDispatch()



    const checkValid = (e) =>{
        const formInput = e.target.querySelectorAll('.sign_in_form-input')
       
        if(!(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))){
            formInput[0].classList.add('invalid')
            return false
        }
        if(!(password.length >= 8)){
            formInput[1].classList.add('invalid')
            return false
        }
        if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)){
            if(password.length >= 8){
                formInput[0].classList.remove('invalid')
                formInput[1].classList.remove('invalid')
                return true
            }
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        try{
            if(checkValid(e)){
                setFormField(defaultFormField)
                setErrorMessage(defauMessage)
                dispatch(signInStart(email, password))
                naviagate('/mainHome')
            }else{
                setErrorMessage({
                    message: 'ERROR',
                    bool: true
                })
            }
        }catch(error){
           console.log(error.message)
        }
      
        
    }
    
    return(
        <div className='sign_in_box'>
            <h3>Sign In</h3>
          
            <form className='sign_in_form' onSubmit={e=>handleSubmit(e)} >
                {bool ?
                    <div className='sign_in_form-container-notify'>
                      <p>{message}</p>
                </div>:<></>}
                <div className='sign_in_form-container-1'>
                    <span className='sign_in_form-group'>
                        
                        <input type="text" name="email" 
                            id="email" 
                            value={email}
                            className='sign_in_form-input form-control' 
                            placeholder='Enter your email or number here...' 
                            onChange={(e)=>handleInput(e)}
                            required 
                            autoFocus/>
                            <label htmlFor ="email" className='sign_in_form-label'> Email or number</label>
                    </span>
                    <select name="fnumber" id="fnumber" className='sign_in_form-select'>
                        <option value="+84">VietNam</option>
                        <option value="+84">VietNam</option>
                        <option value="+84">VietNam</option>
                    </select>
                </div> 
                <div className='sign_in_form-container-1'>
                    <span className='sign_in_form-group'>
                        <input type="text" name="password" 
                            id="password" 
                            className='sign_in_form-input form-control' 
                            placeholder='Enter your password here...' 
                            value={password}
                            onChange={(e)=>handleInput(e)}
                            required />
                        <label htmlFor ="password" className='sign_in_form-label'> Your Password</label>
                    </span>  
                    <button className='sign_in_form-btn' type='button'>SEE</button>
                </div>
                 
                <div className='sign_in_form-container-2'>
                    <button className="btn btn-danger" type="submit" >SIGN IN</button>
                    <label htmlFor="checkbox" className='form_label-checkbox'>
                        <input type='checkbox' className='sign_in_form-checkbox' id="checkbox"/>
                        <div className='checkmark'></div>
                        Remmember 
                       <a href='https://www.netflix.com/vn/LoginHelp' className='Link'>Do you need help ? </a>
                    </label>
                    
               </div>
               <div className='sign_in_form-footer'>
                    This is the first time you join Netflix ?
                    <Link to='/' className='Link' >Sign up now !</Link>
                    
                    

                </div>     
               
                
            </form>
        </div>

    )
}

export default SignIn