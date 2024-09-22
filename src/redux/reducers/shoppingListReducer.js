// shoppingListReducer.js

import {
  FETCH_SHOPPING_LISTS,
  FETCH_SHOPPING_LISTS_SUCCESS,
  FETCH_SHOPPING_LISTS_FAILURE,
  CREATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_SUCCESS,
  CREATE_SHOPPING_LIST_FAILURE,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from '../actions/shoppingListActions';

const initialState = {
  lists: [],
  error: null,
  isLoading: false,
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPPING_LISTS:
    case CREATE_SHOPPING_LIST:
    case UPDATE_ITEM:
    case DELETE_ITEM:
      return {
        ...state,
        isLoading: true,
      };
      
    case FETCH_SHOPPING_LISTS_SUCCESS:
    case CREATE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        lists: action.payload,
        error: null,
        isLoading: false,
      };
      
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
        error: null,
        isLoading: false,
      };
      
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
        error: null,
        isLoading: false,
      };
      
    case FETCH_SHOPPING_LISTS_FAILURE:
    case CREATE_SHOPPING_LIST_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      
    default:
      return state;
  }
};

export default shoppingListReducer;