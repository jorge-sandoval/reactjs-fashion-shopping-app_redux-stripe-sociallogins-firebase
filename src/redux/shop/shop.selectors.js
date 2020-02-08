import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectShopCollectionsArray = createSelector(
    [selectShopCollections],
    (collections) => {
        const arr = [];

        if( collections ) {
            for(let key in collections) {
                if(collections.hasOwnProperty(key)) {
                    arr.push(collections[key]);
                }
            }
        }

        return arr;
    }
);

export const selectCollection = collectionUrl =>  createSelector(
    [selectShopCollections],
    collections => collections ? collections[collectionUrl] : null
)