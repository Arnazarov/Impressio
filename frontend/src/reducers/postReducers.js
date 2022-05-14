import {POSTS_FETCH_ALL, POSTS_CREATE, POSTS_UPDATE, POSTS_DELETE, POSTS_LIKE, POSTS_SEARCH} from '../constants/postConstants';


export const postListReducer = (state = {posts: []} , action) => {
    switch (action.type) {
        case POSTS_FETCH_ALL:   
            return {...state, 
                posts: action.payload.posts,
                pageNumber: action.payload.pageNumber,
                pages: action.payload.pages
            };
        case POSTS_CREATE:
            return {...state, posts: [...state.posts, action.payload]}
        case POSTS_UPDATE:
            return {...state, posts:state.posts.map(post => (post._id === action.payload._id ? action.payload : post))}
        case POSTS_DELETE:
            return {...state, posts:state.posts.filter(post => post._id !== action.payload)}
        case POSTS_LIKE:
            return {...state, posts:state.posts.map(post => (post._id === action.payload._id ? action.payload : post))}
        case POSTS_SEARCH:
            return  {...state, posts: action.payload}
        default:
            return state;
    }

}