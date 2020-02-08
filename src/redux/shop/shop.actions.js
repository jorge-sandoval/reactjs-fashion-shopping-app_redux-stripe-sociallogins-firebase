import ShopActionTypes from './shop.types';

export const updateCollection = (collections) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collections
  });
  