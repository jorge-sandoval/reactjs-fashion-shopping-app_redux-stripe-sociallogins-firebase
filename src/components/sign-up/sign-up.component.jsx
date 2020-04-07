import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss'
import { signUpStart } from '../../redux/user/user.actions';

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

        const { signUpStart } = this.props;
        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert('passwords dondt match');
            return;
        }

        signUpStart( { displayName, email, password } );
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

const mapDispatchToProps = dispatch => ({
    signUpStart : ( userData ) => dispatch( signUpStart( userData ) ),
});

export default connect(null, mapDispatchToProps) (SignUp);
