import { combineReducers } from 'redux';

const wineInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_WINE_DETAIL':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    wineInfo,
})