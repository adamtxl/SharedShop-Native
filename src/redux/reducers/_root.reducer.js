import { combineReducers } from 'redux';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import userItemsReducer from './userItemsReducer';
import shoppingList from './shoppingListReducer';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  userItems: userItemsReducer,
  shoppingList: shoppingList,
});
  
  export default rootReducer;