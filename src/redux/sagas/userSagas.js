import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { 
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
} from '../actions/userActions';

// Fetch Users Saga
function* fetchUsersSaga() {
  try {
    const response = yield call(axios.get, '/api/users');
    yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
}

// Create User Saga
function* createUserSaga(action) {
  try {
    const response = yield call(axios.post, '/api/users', action.payload);
    yield put({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, payload: error.message });
  }
}

// Update User Saga
function* updateUserSaga(action) {
  try {
    const response = yield call(axios.put, `/api/users/${action.payload.id}`, action.payload);
    yield put({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
}

// Delete User Saga
function* deleteUserSaga(action) {
  try {
    yield call(axios.delete, `/api/users/${action.payload.id}`);
    yield put({ type: DELETE_USER_SUCCESS, payload: action.payload.id });
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, payload: error.message });
  }
}

// Root User Saga
export default function* userSagas() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
}