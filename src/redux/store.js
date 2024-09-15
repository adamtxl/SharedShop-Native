import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducers/userReducer';
// import userItemsReducer from './reducers/userItemsReducer';
// import shoppingListReducer from './reducers/shoppingListReducer';
import userSagas from './sagas/userSagas';
import userItemsSagas from './sagas/userItemsSagas';
// import shoppingListSagas from './sagas/shoppingListSagas';

const rootReducer = combineReducers({
  user: userReducer,

});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSagas);
sagaMiddleware.run(userItemsSagas);
// sagaMiddleware.run(shoppingListSagas);

export default store;
