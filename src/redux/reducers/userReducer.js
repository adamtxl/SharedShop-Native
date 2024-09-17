// src/redux/reducers/userReducer.js

import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../actions/userActions';

import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
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
        users: state.users.map((user) =>
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
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      console.log('User details from action payload:', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT_USER:
      AsyncStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}