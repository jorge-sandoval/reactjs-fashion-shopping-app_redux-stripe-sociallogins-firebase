import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ( { cartItem, addItem, removeItem, clearItem } ) => {
    const { name, imageUrl, price, quantity} = cartItem;
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt="item"/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={ () => {removeItem(cartItem)} }>&#10094;</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={ () => {addItem(cartItem)} }>&#10095;</span>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={ ()=> { clearItem(cartItem) } }>&#10005;</div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (cartItem) => { dispatch( addItem(cartItem) ) },
        removeItem: (cartItem) => { dispatch( removeItem(cartItem) ) },
        clearItem: (cartItem) => { dispatch( clearItem(cartItem) ) }
    }
}

export default connect(null,mapDispatchToProps)(CheckoutItem);