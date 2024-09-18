// shoppingListActions.js

// Action Types
export const FETCH_SHOPPING_LISTS = 'FETCH_SHOPPING_LISTS';
export const FETCH_SHOPPING_LISTS_SUCCESS = 'FETCH_SHOPPING_LISTS_SUCCESS';
export const FETCH_SHOPPING_LISTS_FAILURE = 'FETCH_SHOPPING_LISTS_FAILURE';

export const CREATE_SHOPPING_LIST = 'CREATE_SHOPPING_LIST';
export const CREATE_SHOPPING_LIST_SUCCESS = 'CREATE_SHOPPING_LIST_SUCCESS';
export const CREATE_SHOPPING_LIST_FAILURE = 'CREATE_SHOPPING_LIST_FAILURE';

// Action Creators
export const fetchShoppingLists = (userId) => ({
  type: FETCH_SHOPPING_LISTS,
  payload: userId,
});

export const createShoppingList = (listData) => ({
  type: CREATE_SHOPPING_LIST,
  payload: listData,
});