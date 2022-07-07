import { combineReducers } from 'redux';

const wineDetail = (state = [], action) => {
    switch (action.type) {
        case 'SET_WINE_DETAIL':
            return action.payload
        default:
            return state;
    }
}

// all local states stored in one large object
const wineRatingsAndNotes = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_APPEARANCE_INFO':
            return  { 
                ...state, 
                appearanceRating: action.payload.appearanceRating,
                appearanceNotes: action.payload.appearanceNotes,
            }
        case 'ADD_NOSE_INFO':
            return { 
                ...state, 
                noseRating: action.payload.noseRating,
                noseNotes: action.payload.noseNotes,
            }
        case 'ADD_PALATE_INFO':
            return { 
                ...state, 
                palateRating: action.payload.palateRating,
                palateNotes: action.payload.palateNotes,
            }
        case 'ADD_OVERALL_INFO':
            return { 
                ...state, 
                overallRating: action.payload.overallRating,
                overallNotes: action.payload.overallNotes,
                journal_entry_id: Number(action.payload.journal_entry_id)
            }
        default:
            return state;
    }
}

const allInfoRatingsAndNotes = (state = [], action) => {
    switch (action.type) {
        case 'SET_RATINGS_AND_INFO':
            return action.payload
        default:
            return state;
    }
}

const allWinesList = (state = [], action) => {
    switch (action.type) {
        case 'SET_WINE_LIST':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    wineDetail,
    wineRatingsAndNotes,
    allInfoRatingsAndNotes,
    allWinesList
})