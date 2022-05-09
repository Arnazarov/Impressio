import {POSTS_FETCH_ALL, POSTS_CREATE} from '../constants/postConstants';


export const postListReducer = (posts = [] , action) => {
    switch (action.type) {
        case POSTS_FETCH_ALL:
            return action.payload;
        case POSTS_CREATE:
            return {}
        default:
            return posts;
    }

}