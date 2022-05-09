import {POSTS_FETCH_ALL, POSTS_CREATE, POSTS_UPDATE, POSTS_DELETE} from '../constants/postConstants';


export const postListReducer = (posts = [] , action) => {
    switch (action.type) {
        case POSTS_FETCH_ALL:
            return action.payload;
        case POSTS_CREATE:
            return [...posts, action.payload]
        case POSTS_UPDATE:
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case POSTS_DELETE:
            return posts.filter(post => post._id !== action.payload)
        default:
            return posts;
    }

}