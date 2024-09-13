// categories.saga.js
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCategories() {
  try {
    const response = yield axios.get('/api/categories');
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
  } catch (error) {
    console.error('Categories get request failed', error);
  }
}

function* categoriesSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategories);
}

export default categoriesSaga;