import React from 'react';
import './login.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const Login = () => {
    return (
        <div className="login">
            <div className="col">
                <SignIn ></SignIn>
            </div>
            <div className="col">
                <SignUp></SignUp>
            </div>   
        </div>
    )
}

export default Login;