import CardActionTypes from './cart.types';

export const toggleCart = () => ({
  type: CardActionTypes.TOGGLE_CART,
  payload: null
});

export const addItem = (item) => ({
  type: CardActionTypes.ADD_ITEM,
  payload: item
});