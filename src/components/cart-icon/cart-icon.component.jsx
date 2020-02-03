import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggleCart } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/card.selectors';

const CartIcon = ( { itemCount, toggleCart } ) => {
    return (
        <div className="cart-icon" onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{itemCount}</span>
        </div>
    );
};

const mapStateToProps = ( state ) => {
    return {
        itemCount: selectCartItemsCount(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleCart: () => dispatch( toggleCart() )
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CartIcon);