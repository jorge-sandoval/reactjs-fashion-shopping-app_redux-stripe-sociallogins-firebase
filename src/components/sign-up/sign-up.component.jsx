import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils.js';
import './sign-up.styles.scss'
class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert('passwords dondt match');
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});
            
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        catch (error){
            alert(error.message);
        }
    }    

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState(
            this.setState({ [name]:value })
        )
    }


    render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text" 
                        label="Display Name" name="displayName" 
                        value={displayName}
                        onChange={this.handleChange}
                        >
                    </FormInput>
                    <FormInput type="email" 
                        label="Email" name="email" 
                        value={email}
                        onChange={this.handleChange}
                        >
                    </FormInput>
                    <FormInput type="password" 
                        label="Password" name="password" 
                        value={password}
                        onChange={this.handleChange}
                        >
                    </FormInput>
                    <FormInput type="password" 
                        label="Confirm Password" name="confirmPassword" 
                        value={confirmPassword}
                        onChange={this.handleChange}
                        >
                    </FormInput>
                    <CustomButton type="Submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;