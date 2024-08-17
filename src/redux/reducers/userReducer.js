import {
    FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
    UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  } from '../actions/userActions';
  
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case CREATE_USER_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map(user => 
            user.id === action.payload.id ? action.payload : user
          ),
        };
      case UPDATE_USER_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.payload),
        };
      case DELETE_USER_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  