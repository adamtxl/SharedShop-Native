// src/redux/sagas/userItemsSagas.js

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_USER_ITEMS, FETCH_USER_ITEMS_SUCCESS, FETCH_USER_ITEMS_FAILURE,
  CREATE_USER_ITEM, CREATE_USER_ITEM_SUCCESS, CREATE_USER_ITEM_FAILURE,
  UPDATE_USER_ITEM, UPDATE_USER_ITEM_SUCCESS, UPDATE_USER_ITEM_FAILURE,
  DELETE_USER_ITEM, DELETE_USER_ITEM_SUCCESS, DELETE_USER_ITEM_FAILURE,
} from '../actions/userItemsActions';

// Fetch User Items Saga
function* fetchUserItemsSaga() {
  try {
    const response = yield call(axios.get, '/api/user-item');
    yield put({ type: FETCH_USER_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USER_ITEMS_FAILURE, payload: error.message });
  }
}

// Create User Item Saga
function* createUserItemSaga(action) {
  try {
    const response = yield call(axios.post, '/api/user-item', action.payload);
    yield put({ type: CREATE_USER_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_USER_ITEM_FAILURE, payload: error.message });
  }
}

// Update User Item Saga
function* updateUserItemSaga(action) {
  try {
    const response = yield call(axios.put, `/api/user-item/${action.payload.id}`, action.payload);
    yield put({ type: UPDATE_USER_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_USER_ITEM_FAILURE, payload: error.message });
  }
}

// Delete User Item Saga
function* deleteUserItemSaga(action) {
  try {
    yield call(axios.delete, `/api/user-item/${action.payload.id}`);
    yield put({ type: DELETE_USER_ITEM_SUCCESS, payload: action.payload.id });
  } catch (error) {
    yield put({ type: DELETE_USER_ITEM_FAILURE, payload: error.message });
  }
}

// Root User Items Saga
export default function* userItemsSagas() {
  yield takeEvery(FETCH_USER_ITEMS, fetchUserItemsSaga);
  yield takeEvery(CREATE_USER_ITEM, createUserItemSaga);
  yield takeEvery(UPDATE_USER_ITEM, updateUserItemSaga);
  yield takeEvery(DELETE_USER_ITEM, deleteUserItemSaga);
}