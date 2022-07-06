import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addWineInfo(action) {
    try {
        const result = yield axios.post('/api/wineInfo/new-wine', action.payload)
        // don't need to fetch, can just set in store from here!
        yield put({ type: 'FETCH_WINE_DETAIL', payload: result.data.id });
    }
    catch (error) {
        console.log('error in POST wine info', error)
    }
}

function* fetchWineDetail(action) {
    try {
        console.log('action payload id is', action.payload)
        const result = yield axios.get(`/api/wineInfo/${action.payload}`);
        yield put({ type: 'SET_WINE_DETAIL', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}




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
        yield takeLatest('FETCH_WINE_DETAIL', fetchWineDetail);
        // yield takeLatest('ADD-ALL-RATINGS', addUserRatings);
    }

    export default newWineSaga;