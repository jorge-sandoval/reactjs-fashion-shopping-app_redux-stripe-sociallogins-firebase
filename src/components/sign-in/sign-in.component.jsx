import React, { Component } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth } from '../../firebase/firebase.utils.js';
import { googleSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);

            this.setState ({
                email: '',
                password: ''
            })
        }
        catch(error) {
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
        const { googleSignInStart } = this.props;
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                
                <form>
                    <FormInput 
                        label="Email"
                        name="email" type="email" 
                        value={this.state.email}
                        onChange={this.handleChange}
                        required>
                    </FormInput>
                    <FormInput 
                        label="Password"
                        name="password" type="password" 
                        value={this.state.password}
                        onChange={this.handleChange}
                        required>
                    </FormInput>
                    <div className="buttons">
                        <CustomButton type="submit" onClick={this.handleSubmit}>Sign In</CustomButton>
                        <CustomButton type="button" isGoogleSignIn  onClick={googleSignInStart}>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch( googleSignInStart() )
});

export default connect(null, mapDispatchToProps) (SignIn);