import { USER_AUTH, USER_AUTH_RESET, USER_LOGIN, USER_SIGNUP } from "../constants/userConstants";

export const userAuthReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case USER_AUTH:
        case USER_LOGIN:
        case USER_SIGNUP:
            localStorage.setItem('userProfile', JSON.stringify(action?.payload))
            return {...state, authData: action?.payload};
        case USER_AUTH_RESET:
            return {...state, authData: null}
        default:
            return state;
    }

}