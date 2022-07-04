import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addUserRatings(action) {
    try {
        yield axios.post('/api/ratings', action.payload);
        // No need to fetch anything yet b/c ratings will not be displayed to user afterwards
        // yield put({ type: ''})
    } catch (error) {
        console.error('post ratings error', error)
    }
}

function* userRatingsSaga() {
    yield takeLatest('ADD-ALL-RATINGS', addUserRatings);
}

export default userRatingsSaga;