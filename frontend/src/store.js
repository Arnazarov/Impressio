import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { postListReducer } from './reducers/postReducers';
import { userAuthReducer } from './reducers/userReducers';

const reducer = combineReducers({
    postList: postListReducer,
    userAuth: userAuthReducer, 
});

const userInfoFromStorage = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;

const initialState = {
    userAuth: {
        authData: userInfoFromStorage
    }
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));


export default store;