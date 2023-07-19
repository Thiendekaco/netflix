import { Outlet } from "react-router"
import './authentication_signUp.styles.scss'


const AuthenticationSignUp = ()=>(  
    <div className="signUp_container">
        <Outlet />  
    </div> 
    )


export default AuthenticationSignUp