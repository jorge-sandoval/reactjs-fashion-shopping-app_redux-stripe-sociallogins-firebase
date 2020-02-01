import React from 'react';
import './custom-button.style.scss';

const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => {
    const signInClass = isGoogleSignIn ? 'google-sign-in' : '';
    return (
        <button className={ signInClass + ' custom-button'} {...otherProps}>
            {children}
        </button>
    )
}

export default CustomButton;