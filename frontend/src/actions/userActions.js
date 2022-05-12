import { USER_AUTH, USER_AUTH_RESET, USER_LOGIN, USER_SIGNUP } from "../constants/userConstants";
import jwt_decode from "jwt-decode";

export const userAuthAction = (credential) => async (dispatch) => {
    try {

        const googleProfile = jwt_decode(credential);
        
        localStorage.setItem('userProfile', JSON.stringify({...googleProfile}))

        dispatch({
            type: USER_AUTH, 
            payload: googleProfile
        })

    } catch(err) {
        console.log(err);
    }
}

export const userLoginAction = (userInfo) => async (dispatch) => {
    try {


        dispatch({
            type: USER_LOGIN, 
            payload: 'Logged In'
        })

    } catch(err) {
        console.log(err);
    }
}

export const userSignupAction = (userInfo) => async (dispatch) => {
    try {


        dispatch({
            type: USER_SIGNUP, 
            payload: 'Signed Up'
        })

    } catch(err) {
        console.log(err);
    }
}

export const userLogoutAction = () => async (dispatch) => {

    localStorage.removeItem('userProfile');

    dispatch({
        type: USER_AUTH_RESET
    })
}