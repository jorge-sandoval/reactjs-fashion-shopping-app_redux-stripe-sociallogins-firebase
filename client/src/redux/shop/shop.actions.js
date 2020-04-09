import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const updateCollection = (collections) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collections
});

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  payload: undefined
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCES,
  payload: collectionMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});


export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch( fetchCollectionsStart() )

    collectionRef.get()
      .then( snapshot => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch( fetchCollectionsSuccess(collectionMap) )
      })
      .catch( reason => {
        dispatch( fetchCollectionsFailure(reason.message) )
      });
  }
}