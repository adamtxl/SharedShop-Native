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
  
console.log('Root reducer structure:', rootReducer); // Log the structure of combined reducers

  export default rootReducer;