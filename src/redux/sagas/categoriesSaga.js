// src/redux/sagas/categoriesSaga.js

import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/categoryActions';

function* fetchCategoriesSaga() {
  try {
    const response = yield call(axios.get, '/api/categories');
    console.log('API Response: ', response); // Check API response structure
    yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
    console.log('response.data', response.datag) // Adjust this if response structure is different
  } catch (error) {
    console.log('Error in saga: ', error);
    yield put({ type: FETCH_CATEGORIES_FAILURE, payload: error });
  }
}

function* categoriesSaga() {
  yield takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga);
}

export default categoriesSaga;