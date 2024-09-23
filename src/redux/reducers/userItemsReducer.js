import {
  FETCH_USER_ITEMS,
  FETCH_USER_ITEMS_SUCCESS,
  FETCH_USER_ITEMS_FAILURE,
  DELETE_USER_ITEM_SUCCESS
} from '../actions/userItemsActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function userItemsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_ITEMS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case FETCH_USER_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload), // Remove deleted item
      };
    default:
      return state;
  }
}