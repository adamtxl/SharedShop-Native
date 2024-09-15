// src/redux/reducers/categoryReducer.js

const categoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        console.log('Categories in reducer:', action.payload); // Add log here
        return action.payload;
      default:
        return state;
    }
  };
  
  export default categoryReducer;