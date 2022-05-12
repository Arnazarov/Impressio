import { USER_AUTH, USER_AUTH_RESET, USER_LOGIN, USER_SIGNUP } from "../constants/userConstants";
import jwt_decode from "jwt-decode";
import axios from "axios";

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

        const { data } = await axios.post('/user/login', userInfo);

        dispatch({
            type: USER_LOGIN, 
            payload: data
        })

    } catch(err) {
        console.log(err);
    }
}

export const userSignupAction = (userInfo) => async (dispatch) => {
    try {

        const { data } = await axios.post('/user/signup', userInfo);

        dispatch({
            type: USER_SIGNUP, 
            payload: data
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