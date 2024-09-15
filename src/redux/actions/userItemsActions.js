// src/redux/actions/userItemsActions.js

export const FETCH_USER_ITEMS = 'FETCH_USER_ITEMS';
export const FETCH_USER_ITEMS_SUCCESS = 'FETCH_USER_ITEMS_SUCCESS';
export const FETCH_USER_ITEMS_FAILURE = 'FETCH_USER_ITEMS_FAILURE';

export const CREATE_USER_ITEM = 'CREATE_USER_ITEM';
export const CREATE_USER_ITEM_SUCCESS = 'CREATE_USER_ITEM_SUCCESS';
export const CREATE_USER_ITEM_FAILURE = 'CREATE_USER_ITEM_FAILURE';

export const UPDATE_USER_ITEM = 'UPDATE_USER_ITEM';
export const UPDATE_USER_ITEM_SUCCESS = 'UPDATE_USER_ITEM_SUCCESS';
export const UPDATE_USER_ITEM_FAILURE = 'UPDATE_USER_ITEM_FAILURE';

export const DELETE_USER_ITEM = 'DELETE_USER_ITEM';
export const DELETE_USER_ITEM_SUCCESS = 'DELETE_USER_ITEM_SUCCESS';
export const DELETE_USER_ITEM_FAILURE = 'DELETE_USER_ITEM_FAILURE';

// src/redux/actions/userItemsActions.js

export const fetchUserItems = () => ({
    type: FETCH_USER_ITEMS,
  });
  
  export const createUserItem = (item) => ({
    type: CREATE_USER_ITEM,
    payload: item,
  });
  
  export const updateUserItem = (item) => ({
    type: UPDATE_USER_ITEM,
    payload: item,
  });
  
  export const deleteUserItem = (itemId) => ({
    type: DELETE_USER_ITEM,
    payload: { id: itemId },
  });