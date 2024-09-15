// src/redux/reducers/categoryReducer.js

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/categoryActions';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      console.log('Categories fetched successfully', action.payload);
      return {
        ...state,
        categories: action.payload || [], // Ensure payload is valid
        loading: false,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;