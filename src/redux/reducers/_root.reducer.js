import { combineReducers } from 'redux';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import userItemsReducer from './userItemsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  userItems: userItemsReducer,
});
  
  export default rootReducer;