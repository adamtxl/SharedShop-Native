// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/_root.saga';

// Reducers
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';



const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;