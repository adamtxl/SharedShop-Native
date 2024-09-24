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


// Action Types for Items
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

// Action Creators for Items

// Update an Item
export const updateItem = (itemData) => ({
  type: UPDATE_ITEM,
  payload: itemData,
});

// Delete an Item
export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const ADD_ITEMS_TO_SHOPPING_LIST = 'ADD_ITEMS_TO_SHOPPING_LIST';
export const ADD_ITEMS_TO_SHOPPING_LIST_SUCCESS = 'ADD_ITEMS_TO_SHOPPING_LIST_SUCCESS';
export const ADD_ITEMS_TO_SHOPPING_LIST_FAILURE = 'ADD_ITEMS_TO_SHOPPING_LIST_FAILURE';

// Action creator to add items to the shopping list
export const addItemsToShoppingList = (listId, items) => ({
  type: ADD_ITEMS_TO_SHOPPING_LIST,
  payload: { listId, items },
});

export const FETCH_SHOPPING_LIST_DETAILS = 'FETCH_SHOPPING_LIST_DETAILS';
export const FETCH_SHOPPING_LIST_DETAILS_SUCCESS = 'FETCH_SHOPPING_LIST_DETAILS_SUCCESS';
export const FETCH_SHOPPING_LIST_DETAILS_FAILURE = 'FETCH_SHOPPING_LIST_DETAILS_FAILURE';

export const fetchShoppingListDetails = (listId) => ({
  type: FETCH_SHOPPING_LIST_DETAILS,
  payload: listId,
});