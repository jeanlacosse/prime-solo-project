import { combineReducers } from 'redux';

const wineDetail = (state = [], action) => {
    switch (action.type) {
        case 'SET_WINE_DETAIL':
            return action.payload
        default:
            return state;
    }
}

const wineRatingsAndNotes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_APPEARANCE_INFO':
            return [ ...state, action.payload ]
        case 'ADD_NOSE_INFO':
            return [ ...state, action.payload ]
        default:
            return state;
    }
}

export default combineReducers({
    wineDetail,
    wineRatingsAndNotes
})