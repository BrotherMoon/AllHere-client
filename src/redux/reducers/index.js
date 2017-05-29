import {combineReducers} from 'redux';
import {reducerCreator} from 'redux-amrc';
import {TOGGLE_SILDER, TOGGLE_MESSAGEFORM} from '../actions';

const uiReducers = (state = {collapsed: true, messageFormShow: false}, action) => {
    switch (action.type) {
        case TOGGLE_SILDER:
            return Object.assign({}, state, {collapsed: !state.collapsed});
            break;
        case TOGGLE_MESSAGEFORM:
            return Object.assign({}, state, {messageFormShow: !state.messageFormShow})
            break;
        default:
            return state;
    }
};

export const reducers = combineReducers({
    async: reducerCreator(),
    ui: uiReducers
})