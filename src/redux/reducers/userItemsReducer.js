// src/redux/reducers/userItemsReducer.js

import {
    FETCH_USER_ITEMS,
    FETCH_USER_ITEMS_SUCCESS,
    FETCH_USER_ITEMS_FAILURE,
  } from '../actions/userItemsActions';
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };
  
  export default function userItemsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_USER_ITEMS:
        console.log('Reducer: FETCH_USER_ITEMS');
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_USER_ITEMS_SUCCESS:
        console.log('Reducer: FETCH_USER_ITEMS_SUCCESS', action.payload);
        return {
          ...state,
          items: action.payload,
          loading: false,
        };
      case FETCH_USER_ITEMS_FAILURE:
        console.log('Reducer: FETCH_USER_ITEMS_FAILURE', action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }