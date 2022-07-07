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

function* addUserRatings(action) {
    try {
        const result = yield axios.post('/api/wineInfo/ratings', action.payload);
        yield put({ type: 'FETCH_RATINGS_AND_INFO', payload: result.data.journal_entry_id});
    } catch (error) {
        console.error('post ratings error', error)
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

function* fetchRatingsAndInfo(action) {
    try {
        console.log('action payload id is', action.payload)
        const result = yield axios.get(`/api/wineInfo/all/${action.payload}`);
        yield put({ type: 'SET_RATINGS_AND_INFO', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}


function* newWineSaga() {
    yield takeLatest('ADD_WINE_INFO', addWineInfo);
    yield takeLatest('FETCH_WINE_DETAIL', fetchWineDetail);
    yield takeLatest('ADD-ALL-RATINGS', addUserRatings);
    yield takeLatest('FETCH_RATINGS_AND_INFO', fetchRatingsAndInfo);
}

export default newWineSaga;