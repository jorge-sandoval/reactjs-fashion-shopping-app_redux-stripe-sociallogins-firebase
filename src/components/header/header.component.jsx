import React from 'react';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { 
    HeaderContainer, LogoContainer, 
    OptionsContainer, OptionLinkContainer
} from './header.styles'

const Header = ({currentUser, hidden, signOutStart}) => {

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
                        <OptionLinkContainer as="div" onClick={ ()=> { signOutStart() }}>SiGN OUT</OptionLinkContainer> : 
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch( signOutStart() ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);