import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const middlewares = [thunk];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;