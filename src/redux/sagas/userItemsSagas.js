// src/redux/sagas/userItemsSagas.js

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../../axiosConfig'; // Import the pre-configured axios
import {
  FETCH_USER_ITEMS, FETCH_USER_ITEMS_SUCCESS, FETCH_USER_ITEMS_FAILURE,
  CREATE_USER_ITEM, CREATE_USER_ITEM_SUCCESS, CREATE_USER_ITEM_FAILURE,
  UPDATE_USER_ITEM, UPDATE_USER_ITEM_SUCCESS, UPDATE_USER_ITEM_FAILURE,
  DELETE_USER_ITEM, DELETE_USER_ITEM_SUCCESS, DELETE_USER_ITEM_FAILURE,
} from '../actions/userItemsActions';

// Fetch User Items Saga
function* fetchUserItemsSaga() {
  try {
    const response = yield call(axios.get, '/api/user-items');
    yield put({ type: FETCH_USER_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USER_ITEMS_FAILURE, payload: error.message });
  }
}

// Create User Item Saga
function* createUserItemSaga(action) {
  try {
    console.log('Creating user item with data:', action.payload);
    const response = yield call(axios.post, '/api/user-items', action.payload);
    console.log('User item created successfully:', response.data);
    yield put({ type: CREATE_USER_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating user item:', error.message);
    yield put({ type: CREATE_USER_ITEM_FAILURE, payload: error.message });
  }
}

// Update User Item Saga
function* updateUserItemSaga(action) {
  try {
    console.log('Updating user item with data:', action.payload);
    const response = yield call(axios.put, `/api/user-items/${action.payload.id}`, action.payload);
    console.log('User item updated successfully:', response.data);
    yield put({ type: UPDATE_USER_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error updating user item:', error.message);
    yield put({ type: UPDATE_USER_ITEM_FAILURE, payload: error.message });
  }
}

// Delete User Item Saga
function* deleteUserItemSaga(action) {
  try {
    console.log('Deleting user item with ID:', action.payload.id);
    yield call(axios.delete, `/api/user-items/${action.payload.id}`);
    console.log('User item deleted successfully');
    yield put({ type: DELETE_USER_ITEM_SUCCESS, payload: action.payload.id });
  } catch (error) {
    console.error('Error deleting user item:', error.message);
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