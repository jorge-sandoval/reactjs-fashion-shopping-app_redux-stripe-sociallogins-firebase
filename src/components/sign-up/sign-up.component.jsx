import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss'
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
    const [credentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords dondt match');
            return;
        }
        signUpStart( { displayName, email, password } );
    }    

    const handleChange = (e) => {
        const { value, name } = e.target;
        setCredentials({ ...credentials, [name]:value })
    }


    return(
        <div className="sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput type="text" 
                    label="Display Name" name="displayName" 
                    value={displayName}
                    onChange={handleChange}
                    >
                </FormInput>
                <FormInput type="email" 
                    label="Email" name="email" 
                    value={email}
                    onChange={handleChange}
                    >
                </FormInput>
                <FormInput type="password" 
                    label="Password" name="password" 
                    value={password}
                    onChange={handleChange}
                    >
                </FormInput>
                <FormInput type="password" 
                    label="Confirm Password" name="confirmPassword" 
                    value={confirmPassword}
                    onChange={handleChange}
                    >
                </FormInput>
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart : ( userData ) => dispatch( signUpStart( userData ) ),
});

export default connect(null, mapDispatchToProps) (SignUp);
