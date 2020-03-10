import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionsTypes from './user.types';
import { 
    signInSuccess, signInFailure, 
    signOutSuccess, signOutFailure
} from './user.actions';
import { 
    auth, googleAuthProvider, 
    createUserProfileDocument, getCurrentUser 
} from '../../firebase/firebase.utils';

export function* getSnapShotFromUserAuth(user) {
    try{
        const userRef = yield call( createUserProfileDocument, user );
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

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)
    ])
}