import { USER_AUTH } from "../constants/userConstants";

export const userAuthReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case USER_AUTH:
            localStorage.setItem('userProfile', JSON.stringify({...action?.payload}))
            return {...state, authData: action?.payload};
        default:
            return state;
    }

}