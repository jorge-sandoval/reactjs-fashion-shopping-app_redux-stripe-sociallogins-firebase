import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { 
    HeaderContainer, LogoContainer, 
    OptionsContainer, OptionDivContainer, OptionLinkContainer
} from './header.styles'

const Header = ({currentUser, hidden}) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLinkContainer to="/shop">SHOP</OptionLinkContainer>
                <OptionLinkContainer to="/contact">CONTACT</OptionLinkContainer>
                {
                    currentUser ? 
                        <OptionDivContainer onClick={ ()=> { auth.signOut() }}>SiGN OUT</OptionDivContainer> : 
                        <OptionLinkContainer to="/login">SiGN IN</OptionLinkContainer>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null: <CartDropdown/>
            }
            
        </HeaderContainer>
    )
}

const mapStateToProps = ({ user: {currentUser} , cart : {hidden}}) => {
    return {
        currentUser : currentUser,
        hidden : hidden
    }
}

export default connect(mapStateToProps)(Header);