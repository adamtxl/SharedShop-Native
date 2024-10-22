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
  ADD_ITEMS_TO_SHOPPING_LIST,
  ADD_ITEMS_TO_SHOPPING_LIST_SUCCESS,
  ADD_ITEMS_TO_SHOPPING_LIST_FAILURE,
  FETCH_SHOPPING_LIST_DETAILS,
  FETCH_SHOPPING_LIST_DETAILS_SUCCESS,
  FETCH_SHOPPING_LIST_DETAILS_FAILURE
} from '../actions/shoppingListActions';

const initialState = {
  lists: [],               // Holds all shopping lists
  details: {},             // Holds details of a specific shopping list
  error: null,             // Error messages (if any)
  isLoading: false,        // Loading state indicator
  createdList: null,       // Holds the newly created shopping list
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {

    // --- Shopping List Actions ---
    case FETCH_SHOPPING_LISTS:
    case CREATE_SHOPPING_LIST:
    case ADD_ITEMS_TO_SHOPPING_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,        // Clear errors on new actions
      };

    // --- Fetch All Shopping Lists Success ---
    case FETCH_SHOPPING_LISTS_SUCCESS:
      console.log('Reducer: Updating lists with:', action.payload); // Debugging in the reducer
      return {
        ...state,
        lists: action.payload,
        isLoading: false,
        error: null,
      };

    // --- Create Shopping List Success ---
    case CREATE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        lists: [...state.lists, action.payload],  // Append the new list to the existing lists
        createdList: action.payload,             // Store the newly created list
        isLoading: false,
        error: null,
      };

    // --- Add Items to Shopping List Success ---
    case ADD_ITEMS_TO_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    // --- Shopping List Details ---
    case FETCH_SHOPPING_LIST_DETAILS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    // --- Fetch Shopping List Details Success ---
    case FETCH_SHOPPING_LIST_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoading: false,
        error: null,
      };

    // --- Update Item Success ---
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.id ? action.payload : list
        ),
        isLoading: false,
        error: null,
      };

    // --- Delete Item Success ---
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
        isLoading: false,
        error: null,
      };

    // --- Error Handling ---
    case FETCH_SHOPPING_LISTS_FAILURE:
    case CREATE_SHOPPING_LIST_FAILURE:
    case ADD_ITEMS_TO_SHOPPING_LIST_FAILURE:
    case FETCH_SHOPPING_LIST_DETAILS_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    // --- Clear createdList after it's used ---
    case 'CLEAR_CREATED_LIST':
      return {
        ...state,
        createdList: null, // Reset the created list
      };

    // --- Default Case ---
    default:
      return state;
  }
};