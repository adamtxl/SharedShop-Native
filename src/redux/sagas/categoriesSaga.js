// src/redux/sagas/categoriesSaga.js

import { put, takeLatest, call } from 'redux-saga/effects';
import axios from '../../axiosConfig'; // Import the pre-configured axios
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/categoryActions';

function* fetchCategoriesSaga() {
  try {
    const response = yield call(axios.get, '/api/categories');
    yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log('Error in saga: ', error);
    yield put({ type: FETCH_CATEGORIES_FAILURE, payload: error });
  }
}

function* categoriesSaga() {
  yield takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga);
}

export default categoriesSaga;