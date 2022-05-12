import { USER_AUTH, USER_AUTH_RESET } from "../constants/userConstants";

export const userAuthReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case USER_AUTH:
            return {...state, authData: action?.payload};
        case USER_AUTH_RESET:
            return {authData: null}
        default:
            return state;
    }

}