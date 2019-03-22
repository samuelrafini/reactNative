import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    REPEAT_PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGN_UP_USER,
    SIGN_UP_USER_FAIL
} from './types';
// import { NavigationActions } from 'react-navigation';
// import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const repeatPasswordChanged = (text) => {
    return {
        type: REPEAT_PASSWORD_CHANGED,
        payload: text
    };
};

// export const loginUser = () => async dispatch => {

export const loginUser = ({ email, password }) => dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch((error) => loginUserFail(dispatch, error.message));
}

export const signUpUser = ({ email, password }) => dispatch => {
    dispatch({ type: SIGN_UP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            loginUserSuccess(dispatch, user)
            _storeData(user);
        })
        .catch((error) => signUpUserFail(dispatch, error.message));
}
// export const loginUser = ({ email, password }) => {
//     return (dispatch) => {
//         dispatch({ type: LOGIN_USER });
//         firebase.auth().signInWithEmailAndPassword(email, password)
//             .then(user => loginUserSuccess(dispatch, user))
//             .catch(() => {
//                 firebase.auth().createUserWithEmailAndPassword(email, password)
//                     .then(user => loginUserSuccess(dispatch, user))
//                     .catch(() => loginUserFail(dispatch));
//             })
//     };
// };

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error
    })
}

const signUpUserFail = (dispatch, error) => {
    dispatch({
        type: SIGN_UP_USER_FAIL,
        payload: error
    })
}

const loginUserSuccess = (dispatch, user) => {
    console.log(user);
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    // AsyncStorage.setItem('user', user);
    // Actions.main();
}

_storeData = async (user) => {
    console.log('_storeData called')
    try {
        await AsyncStorage.setItem('user', user);
    } catch (error) {
        // Error saving data
        console.log(error)
    }
}