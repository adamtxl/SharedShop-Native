// src/redux/sagas/categoriesSaga.js

import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCategories() {
  try {
    console.log('Fetching categories...');
    const response = yield call(axios.get, '/api/categories');
    console.log('Categories response:', response.data); // Check structure
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

function* categoriesSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategories);
}

export default categoriesSaga;