import React, { useState } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) =>  {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = credentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        emailSignInStart( email, password );
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setCredentials({ credentials, [name]:value })
    }


    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            
            <form>
                <FormInput 
                    label="Email"
                    name="email" type="email" 
                    value={email}
                    onChange={handleChange}
                    required>
                </FormInput>
                <FormInput 
                    label="Password"
                    name="password" type="password" 
                    value={password}
                    onChange={handleChange}
                    required>
                </FormInput>
                <div className="buttons">
                    <CustomButton type="submit" onClick={handleSubmit}>Sign In</CustomButton>
                    <CustomButton type="button" isGoogleSignIn  onClick={googleSignInStart}>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch( googleSignInStart() ),
    emailSignInStart : ( email, password ) => dispatch( emailSignInStart( {email, password} ) ),
});

export default connect(null, mapDispatchToProps) (SignIn);