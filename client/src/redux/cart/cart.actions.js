import CardActionTypes from './cart.types';

export const toggleCart = () => ({
  type: CardActionTypes.TOGGLE_CART,
  payload: null
});

export const addItem = (item) => ({
  type: CardActionTypes.ADD_ITEM,
  payload: item
});

export const clearItem = (item) => ({
  type: CardActionTypes.CLEAR_ITEM,
  payload: item
});

export const removeItem = (item) => ({
  type: CardActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearCart = () => ({
  type: CardActionTypes.CLEAR_CART,
  payload: null
});