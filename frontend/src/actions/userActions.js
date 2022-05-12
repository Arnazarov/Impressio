import { USER_AUTH } from "../constants/userConstants";
import jwt_decode from "jwt-decode";

export const userAuthAction = (credential) => async (dispatch) => {
    try {

        const googleProfile = jwt_decode(credential);

        dispatch({
            type: USER_AUTH, 
            payload: googleProfile
        })

    } catch(err) {
        console.log(err);
    }
}