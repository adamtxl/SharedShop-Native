import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Reducers
import userReducer from './reducers/userReducer';
import categoriesReducer from './reducers/categoryReducer';

//Sagas
import userSagas from './sagas/userSagas';
import userItemsSagas from './sagas/userItemsSagas';
import categoriesSaga from './sagas/categoriesSaga';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSagas);
sagaMiddleware.run(userItemsSagas);
sagaMiddleware.run(categoriesSaga);

export default store;
