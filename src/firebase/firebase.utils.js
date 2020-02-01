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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
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

export default firebase;

