import {POSTS_FETCH_ALL, POSTS_CREATE, POSTS_UPDATE, POSTS_DELETE, POSTS_LIKE, POSTS_SEARCH, START_LOADING, END_LOADING, POSTS_FETCH_SINGLE, POSTS_COMMENT} from '../constants/postConstants';
import axios from 'axios';

const API = axios.create();

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile')).token}`
    }

    return req;
})

export const postListAction = (page) => async (dispatch) => {
    try {

        dispatch({
            type: START_LOADING
        })

        const { data } = await axios.get(`/posts?page=${page}`);

        dispatch({
            type: POSTS_FETCH_ALL, 
            payload: data
        })

        localStorage.setItem('posts', JSON.stringify(data.posts));

        dispatch({
            type: END_LOADING
        })

    } catch(err) {
        console.log(err);
    }
}

export const postFetchAction = (id) => async (dispatch) => {
    try {

        dispatch({
            type: START_LOADING
        })

        const { data } = await axios.get(`/posts/${id}`);

        dispatch({
            type: POSTS_FETCH_SINGLE, 
            payload: data
        })

        dispatch({
            type: END_LOADING
        })

    } catch(err) {
        console.log(err);
    }
}

export const postSearchAction = ({title, tags}) => async (dispatch) => {
    try {

        dispatch({
            type: START_LOADING
        })

        const { data } = await axios.get(`/posts/search?searchQuery=${title}&tags=${tags}`);

        dispatch({
            type: POSTS_SEARCH, 
            payload: data
        })

        dispatch({
            type: END_LOADING
        })

    } catch(err) {
        console.log(err);
    }
}

export const postCreateAction = (newPost) => async (dispatch) => {
    try {

        dispatch({
            type: START_LOADING
        })

        const {data} = await API.post('/posts', newPost); 

        dispatch({
            type: POSTS_CREATE, 
            payload: data
        })

        dispatch({
            type: END_LOADING
        })

    } catch(err) {
        console.log(err);
    }
}

export const postUpdateAction = (id, updatedPost) => async (dispatch) => {
    try {

        const {data} = await API.patch(`/posts/${id}`, updatedPost); 

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

        await API.delete(`/posts/${id}`); 

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

        const {data} = await API.patch(`/posts/${id}/like`); 

        dispatch({
            type: POSTS_LIKE, 
            payload: data
        })

    } catch(err) {
        console.log(err);
    }
}

export const postCommentAction = (comment, postId) => async (dispatch) => {
    try {

        const {data} = await API.post(`/posts/${postId}/comment`, {comment}); 

        dispatch({
            type: POSTS_COMMENT, 
            payload: data
        })

        return data.comments;

    } catch(err) {
        console.log(err);
    }
}