import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  FETCH_SHOPPING_LISTS, FETCH_SHOPPING_LISTS_SUCCESS, FETCH_SHOPPING_LISTS_FAILURE, 
  CREATE_SHOPPING_LIST, CREATE_SHOPPING_LIST_SUCCESS, CREATE_SHOPPING_LIST_FAILURE, 
  UPDATE_ITEM, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE, 
  DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE 
} from '../actions/shoppingListActions';
import axios from '../../axiosConfig'; // Your axiosConfig

// Saga to handle fetching shopping lists
function* fetchShoppingListsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/shopping-list/user/${action.payload}`);
    yield put({ type: FETCH_SHOPPING_LISTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_SHOPPING_LISTS_FAILURE, payload: error.message });
  }
}

// Saga to handle creating a new shopping list
function* createShoppingListSaga(action) {
  try {
    const response = yield call(axios.post, `/api/shopping-list`, action.payload);
    yield put({ type: CREATE_SHOPPING_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_SHOPPING_LIST_FAILURE, payload: error.message });
  }
}

// Saga to handle updating an item
// shoppingListSagas.js

function* updateItemSaga(action) {
  try {
    const { id, item_name, description, category_id, user_id } = action.payload;
    console.log('Saga: Updating user item with data:', action.payload); // For debugging

    const response = yield call(axios.put, `/api/user-items/${id}`, {
      item_name,
      description,
      category_id,
      user_id,
    });

    yield put({ type: 'UPDATE_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Saga: Error updating user item:', error.message);
    yield put({ type: 'UPDATE_ITEM_FAILURE', payload: error.message });
  }
}

// Saga to handle deleting an item
function* deleteItemSaga(action) {
  try {
    yield call(axios.delete, `/api/user-items/${action.payload}`);
    yield put({ type: DELETE_ITEM_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_ITEM_FAILURE, payload: error.message });
  }
}

// Watcher saga
export function* shoppingListSagas() {
  yield takeLatest(FETCH_SHOPPING_LISTS, fetchShoppingListsSaga);
  yield takeLatest(CREATE_SHOPPING_LIST, createShoppingListSaga);
  yield takeLatest(UPDATE_ITEM, updateItemSaga);
  yield takeLatest(DELETE_ITEM, deleteItemSaga);
}