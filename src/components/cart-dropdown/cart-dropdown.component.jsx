import React from 'react';
import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/card.selectors';
import { toggleCart } from '../../redux/cart/cart.actions';

const CartDropdown = ({cartItems, history, toggleCart}) => {
    
    const handleClick = ()=> {
        toggleCart();
        history.push('/checkout');
    }

    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                        cartItems.map( cartItem => {
                            return (<CartItem key={cartItem.id} item={cartItem}/>)
                        })
                        : <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={ handleClick }>GO TO CHECKOUT</CustomButton>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems : selectCartItems(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleCart: () => dispatch( toggleCart() )
    }
}

export default withRouter(
    connect(
        mapStateToProps, 
        mapDispatchToProps
    )(CartDropdown)
);