import styled, { css } from 'styled-components';

const ButtonStyles= css`
    background-color: black;
    color: white;
    border: none;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;

const GoogleSignInButtonStyles = css`
    background-color: #4282f4;
    color: white;
    border: none;

    &:hover {
        background-color: #3578e8;
        border: none;
    }
`;

const InvertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
        background-color: black;
        color: white;
        border: none;
    }
`;

const getButtonStyles = (props) => {
    if (props.isGoogleSignIn) {
        return GoogleSignInButtonStyles;
    }
    else if ( props.iverted ) {
        return InvertedButtonStyles
    }
    return ButtonStyles;
}

const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: flex;
    justify-content: center;

    ${getButtonStyles}
`;

export default CustomButtonContainer;