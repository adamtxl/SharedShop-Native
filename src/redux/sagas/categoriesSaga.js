// src/redux/sagas/categoriesSaga.js

import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCategories() {
  try {
    console.log('Fetching categories...');
    const response = yield axios.get('/api/categories');
    console.log('Categories fetched successfully:', response.data);
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

function* categoriesSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategories);
}

export default categoriesSaga;