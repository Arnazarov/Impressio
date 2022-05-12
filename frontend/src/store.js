import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { postListReducer } from './reducers/postReducers';
import { userAuthReducer } from './reducers/userReducers';

const reducer = combineReducers({
    posts: postListReducer,
    userAuth: userAuthReducer, 
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


export default store;