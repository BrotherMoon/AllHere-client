import {createStore, applyMiddleware} from 'redux';
import {asyncMiddleware} from 'redux-amrc';
import {reducers} from '../reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk, asyncMiddleware)));