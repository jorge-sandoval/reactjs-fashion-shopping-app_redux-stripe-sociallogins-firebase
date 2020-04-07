import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionsTypes from './user.types';
import { 
    signInSuccess, signInFailure, 
    signOutSuccess, signOutFailure,
    signUpSuccess, signUpFailure
} from './user.actions';
import { 
    auth, googleAuthProvider, 
    createUserProfileDocument, getCurrentUser 
} from '../../firebase/firebase.utils';

export function* getSnapShotFromUserAuth(user, moreData) {
    try{
        const userRef = yield call( createUserProfileDocument, user, moreData );
        const userSnapshot = yield userRef.get();
        yield put ( signInSuccess( {
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch( error ){
        yield put ( signInFailure(error) );
    }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield auth.signInWithPopup(googleAuthProvider);
        yield getSnapShotFromUserAuth(user);
    } catch( error ){
        yield put ( signInFailure(error) );
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionsTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

export function* signInWithEmail({ payload: { email, password } }) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword( email, password );
        yield getSnapShotFromUserAuth(user);
    } catch( error ){
        yield put ( signInFailure(error) );
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionsTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

export function* isUserAuthenticated(){
    try {
        const user = yield getCurrentUser();
        if(!user) return;

        yield getSnapShotFromUserAuth(user)
    } catch( error ){
        yield put ( signInFailure(error) )
    }
}

export function* onCheckUserSession() {
    yield takeLatest(
        UserActionsTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield put ( signOutSuccess() )
    } catch( error ){
        yield put ( signOutFailure(error) )
    }
}

export function* onSignOutStart() {
    yield takeLatest(
        UserActionsTypes.SIGN_OUT_START,
        signOut
    )
}


export function* signUpWithData({ payload: { displayName, email, password } }) {
    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put ( signUpSuccess( user, { displayName} ) );
    } catch( error ){
        yield put ( signUpFailure(error) );
    }
}

export function* onSignUpStart() {
    yield takeLatest(
        UserActionsTypes.SIGN_UP_START,
        signUpWithData
    )
}

export function* singInAfterSignUp({ payload: { user, moreData } }) {
    yield getSnapShotFromUserAuth(user, moreData);
}

export function* onSignUpSuccess() {
    yield takeLatest(
        UserActionsTypes.SIGN_UP_SUCCESS,
        singInAfterSignUp
    )
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}