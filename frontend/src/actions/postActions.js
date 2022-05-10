import {POSTS_FETCH_ALL, POSTS_CREATE, POSTS_UPDATE, POSTS_DELETE, POSTS_LIKE} from '../constants/postConstants';
import axios from 'axios';

export const postListAction = () => async (dispatch) => {
    try {

        const { data } = await axios.get('/posts');

        dispatch({
            type: POSTS_FETCH_ALL, 
            payload: data
        })

    } catch(err) {
        console.log(err);
    }
}

export const postCreateAction = (newPost) => async (dispatch) => {
    try {

        const {data} = await axios.post('/posts', newPost); 

        dispatch({
            type: POSTS_CREATE, 
            payload: data
        })

    } catch(err) {
        console.log(err);
    }
}

export const postUpdateAction = (id, updatedPost) => async (dispatch) => {
    try {

        const {data} = await axios.patch(`/posts/${id}`, updatedPost); 

        dispatch({
            type: POSTS_UPDATE, 
            payload: data
        })

    } catch(err) {
        console.log(err);
    }
}

export const postDeleteAction = (id) => async (dispatch) => {
    try {

        await axios.delete(`/posts/${id}`); 

        dispatch({
            type: POSTS_DELETE, 
            payload: id
        })

    } catch(err) {
        console.log(err);
    }
}

export const postLikeAction = (id) => async (dispatch) => {
    try {

        const {data} = await axios.patch(`/posts/${id}/like`); 

        dispatch({
            type: POSTS_LIKE, 
            payload: data
        })

    } catch(err) {
        console.log(err);
    }
}