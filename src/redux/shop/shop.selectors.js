import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectShopCollectionsArray = createSelector(
    [selectShopCollections],
    (collections) => Object.values(collections)
);

export const selectCollection = collectionUrl =>  createSelector(
    [selectShopCollections],
    collections => collections[collectionUrl]
)