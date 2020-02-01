import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux';

import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';

const Header = ({currentUser}) => {
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {
                    currentUser ? 
                        <div className="option" onClick={ ()=> { auth.signOut() }}>SiGN OUT</div> : 
                        <Link className="option" to="/login">SiGN IN</Link>
                }
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser : state.user.currentUser
    }
}

export default connect(mapStateToProps)(Header);