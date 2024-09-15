import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});
  
  export default rootReducer;