import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
  payload: null
});

export const emailSignInStart = (emaiAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emaiAndPassword
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
  payload: null
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
  payload: null
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
  payload: null
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = (userData) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userData
});

export const signUpSuccess = ( user, moreData ) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, moreData }
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});
