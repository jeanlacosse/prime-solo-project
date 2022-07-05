import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addWineInfo(action) {
    try {
        const result = yield axios.post('/api/wineInfo/new-wine', action.payload)
        // don't need to fetch, can just set in store from here!
        yield put({ type: 'SET_WINE_DETAIL', payload: result.data});
        console.log('action payload is:', result.data)
    }
    catch (error) {
        console.log('error in POST wine info', error)
    }
}

// function* fetchSpecificWineInfo(action) {
//     try {
//         const wineData = yield axios.get(`/api/wineInfo/`)
//     }
// }


// function* addUserRatings(action) {
//     try {
//         yield axios.post('/api/wineInfo', action.payload);
//         // No need to fetch anything yet b/c ratings will not be displayed to user afterwards
//         // yield put({ type: ''})
//     } catch (error) {
//         console.error('post ratings error', error)
//     }
// }

function* newWineSaga() {
    yield takeLatest('ADD_WINE_INFO', addWineInfo);
    // yield takeLatest('ADD-ALL-RATINGS', addUserRatings);
}

export default newWineSaga;