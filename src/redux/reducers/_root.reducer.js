import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});
  
  export default rootReducer;