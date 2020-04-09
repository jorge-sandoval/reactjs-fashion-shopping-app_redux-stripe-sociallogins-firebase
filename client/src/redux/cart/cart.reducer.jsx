 import CartActionTypes from './cart.types';
 import {addItemToCart, removetemFromCart} from './cart.utils.js'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART:
            return {
                ...state,
                hidden : !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                cartItems:[ ...state.cartItems.filter(item => item.id !== action.payload.id ) ]
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removetemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
};

export default cartReducer;