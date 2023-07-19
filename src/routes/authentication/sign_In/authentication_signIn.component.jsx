import SignIn from '../../../component/sign_in/sign_in_form.component';
import './authentication_signIn.styles.scss'
import Logo from '../../../component/logo/logo.component';
import Footer from '../../../component/footer/footer.component';
import { Link } from 'react-router-dom';
const AuthenticationSignIn = () =>{
    const bg = require('../../../assets/home.pictures/background_login.jpg');

    return(
        <div className='auth'>
            <Link to='/' className='auth_logo-container'>
                <Logo />
            </Link>
            <img src={bg} alt = "" className='auth_background'/>
            <div className='auth_content' >
               <SignIn />
                 
            </div>
            <div className='auth_footer' >
                <Footer />
            </div>
        </div>
    )
}

export default AuthenticationSignIn