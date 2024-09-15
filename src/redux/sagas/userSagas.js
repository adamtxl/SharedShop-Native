import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { 
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
} from '../actions/userActions';

// Fetch Users Saga
function* fetchUsersSaga() {
  try {
    const response = yield call(axios.get, '/api/user');
    yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
}
axios.defaults.baseURL = 'http://192.168.86.105:5001'; 
// Create User Saga
function* createUserSaga(action) {
  try {
    console.log('Creating user with data:', action.payload);
    const response = yield call(axios.post, '/api/user/register', action.payload);
    console.log('User created successfully:', response.data);
    yield put({ type: CREATE_USER_SUCCESS, payload: response.data });

    // Dispatch loginUser action to log in the user after successful registration
    const { username, password } = action.payload;
    yield put({ type: LOGIN_USER, payload: { username, password } });
  } catch (error) {
    console.error('Error creating user:', error.message);
    yield put({ type: CREATE_USER_FAILURE, payload: error.message });
  }
}

// Update User Saga
function* updateUserSaga(action) {
  try {
    const response = yield call(axios.put, `/api/user/${action.payload.id}`, action.payload);
    yield put({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
}

// Delete User Saga
function* deleteUserSaga(action) {
  try {
    yield call(axios.delete, `/api/user/${action.payload.id}`);
    yield put({ type: DELETE_USER_SUCCESS, payload: action.payload.id });
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, payload: error.message });
  }
}

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, '/api/user/login', action.payload);
    console.log('Login response:', response.data); // Check the response contains user data
    yield put({ type: LOGIN_USER_SUCCESS, payload: response.data.user }); // Ensure this contains user data
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
}

// Root User Saga
export default function* userSagas() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
  yield takeEvery(LOGIN_USER, loginUserSaga);
}