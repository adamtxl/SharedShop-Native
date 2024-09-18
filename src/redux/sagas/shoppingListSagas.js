// shoppingListSagas.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_SHOPPING_LISTS, FETCH_SHOPPING_LISTS_SUCCESS, FETCH_SHOPPING_LISTS_FAILURE, CREATE_SHOPPING_LIST, CREATE_SHOPPING_LIST_SUCCESS, CREATE_SHOPPING_LIST_FAILURE } from '../actions/shoppingListActions';
import axios from '../../axiosConfig'; // Your axiosConfig

// Saga to handle fetching shopping lists
function* fetchShoppingListsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/shopping-list/user/${action.payload}`); // Axios call
    yield put({ type: FETCH_SHOPPING_LISTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_SHOPPING_LISTS_FAILURE, payload: error.message });
  }
}

// Saga to handle creating a new shopping list
function* createShoppingListSaga(action) {
  try {
    const response = yield call(axios.post, `/api/shopping-list`, action.payload); // Axios call
    yield put({ type: CREATE_SHOPPING_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_SHOPPING_LIST_FAILURE, payload: error.message });
  }
}

// Watcher saga
export function* shoppingListSagas() {
  yield takeLatest(FETCH_SHOPPING_LISTS, fetchShoppingListsSaga);
  yield takeLatest(CREATE_SHOPPING_LIST, createShoppingListSaga);
}