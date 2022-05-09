import {POSTS_FETCH_ALL, POSTS_CREATE} from '../constants/postConstants';
import axios from 'axios';

export const postListAction = () => async (dispatch) => {
    try {

        const { data } = await axios.get('/posts');

        dispatch({
            type: POSTS_FETCH_ALL, 
            payload: data
        })

    } catch(err) {
        console.log(err.message);
    }
}