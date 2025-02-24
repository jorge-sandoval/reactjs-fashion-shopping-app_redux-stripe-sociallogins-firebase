import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

var firebaseConfig = {
    apiKey: "AIzaSyDkiM9NQoIYGMo5NiWT6_QSoYsbxPJz0bg",
    authDomain: "react-crown-store.firebaseapp.com",
    databaseURL: "https://react-crown-store.firebaseio.com",
    projectId: "react-crown-store",
    storageBucket: "react-crown-store.appspot.com",
    messagingSenderId: "462266583515",
    appId: "1:462266583515:web:557e27e1b13d7a45e0fffe",
    measurementId: "G-M1VMX61LV5"
};

firebase.initializeApp(firebaseConfig);

export const getCurrentUser = ()=> {
    return new Promise( (resolve, reject) => {
        const unsubcribe = auth.onAuthStateChanged( userAuth => {
            unsubcribe();
            resolve(userAuth);
        }, reject);
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider);

export const createUserProfileDocument = async(userAuth, moreData) => {
    if(!userAuth){  return; }

    const userRef = firestore.doc('users/' + userAuth.uid);
    const userSnapshot = await userRef.get();

    if(!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName: displayName,
                email: email,
                createdAt: createdAt,
                ...moreData
            });
        }catch(error){
            console.log('Error creating users', error.message);
        }
    }

    return userRef;
}


export const addCollectionAndDocuments = async (collectionKey, objToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objToAdd.forEach( obj => {
        const docRef = collectionRef.doc();
        batch.set( docRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = ( collections ) => {
    const collectionArray = collections.docs.map ( doc => {
        const { title, items } = doc.data();

        return {
            id: doc.id,
            title,
            routeName: encodeURI( title.toLowerCase() ),
            items,
        }
    })

    const collectionMap = collectionArray.reduce( ( map, collection) => {
        map[collection.title.toLowerCase()] = collection;
        return map;
    }, {} );

    return collectionMap;
}

export default firebase;

