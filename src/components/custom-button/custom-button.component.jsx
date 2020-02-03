import React from 'react';
import './custom-button.style.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => {
    const signInClass = isGoogleSignIn ? 'google-sign-in' : ' ';
    const invertedClass = inverted ? 'inverted' : ' ';
    return (
        <button className={ signInClass + invertedClass + ' custom-button'} {...otherProps}>
            {children}
        </button>
    )
}

export default CustomButton;