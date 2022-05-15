import {POSTS_FETCH_ALL, POSTS_CREATE, POSTS_UPDATE, POSTS_DELETE, POSTS_LIKE, POSTS_SEARCH, START_LOADING, END_LOADING, POSTS_FETCH_SINGLE, POSTS_COMMENT} from '../constants/postConstants';


export const postListReducer = (state = {isLoading: true, posts: [], post: null} , action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case POSTS_FETCH_ALL:   
            return {...state, 
                posts: action.payload.posts,
                pageNumber: action.payload.pageNumber,
                pages: action.payload.pages
            };
        case POSTS_FETCH_SINGLE:
            return {...state, post: action.payload}
        case POSTS_CREATE:
            return {...state, posts: [...state.posts, action.payload]}
        case POSTS_UPDATE:
            return {...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post))}
        case POSTS_DELETE:
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)}
        case POSTS_LIKE:
            return {...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post))}
        case POSTS_SEARCH:
            return  {...state, posts: action.payload}
        case POSTS_COMMENT:
            return {...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post))}
        default:
            return state;
    }

}