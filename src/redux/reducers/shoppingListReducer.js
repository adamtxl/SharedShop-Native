// shoppingListReducer.js

import {
    FETCH_SHOPPING_LISTS_SUCCESS,
    FETCH_SHOPPING_LISTS_FAILURE,
    CREATE_SHOPPING_LIST_SUCCESS,
    CREATE_SHOPPING_LIST_FAILURE,
  } from '../actions/shoppingListActions';
  
  const initialState = {
    lists: [],
    error: null,
  };
  
  const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SHOPPING_LISTS_SUCCESS:
        return {
          ...state,
          lists: action.payload,
          error: null,
        };
      case FETCH_SHOPPING_LISTS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case CREATE_SHOPPING_LIST_SUCCESS:
        return {
          ...state,
          lists: [...state.lists, action.payload],
          error: null,
        };
      case CREATE_SHOPPING_LIST_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default shoppingListReducer;