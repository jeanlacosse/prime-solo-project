import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addUserRatings() {

}

function* userRatingsSaga() {
    yield takeLatest('ADD-ALL-RATINGS', addUserRatings);
}

export default userRatingsSaga;