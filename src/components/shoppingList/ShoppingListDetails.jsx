import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingListDetails, addItemsToShoppingList } from '../../redux/actions/shoppingListActions';
import { fetchUserItems } from '../../redux/actions/userItemsActions';
import DisplayUserItems from '../userList/DisplayUserItems';

const ShoppingListDetails = ({ route }) => {
  const { listId } = route.params;
  const dispatch = useDispatch();
  const shoppingListDetails = useSelector(state => state.shoppingList.details);
  const isLoading = useSelector(state => state.shoppingList.isLoading);

  useEffect(() => {
    dispatch(fetchShoppingListDetails(listId));
  }, [dispatch, listId]);

  const handleAddToList = (itemId, quantity) => {
    dispatch(addItemsToShoppingList(listId, [{ id: itemId, quantity }]));
  };

  const renderListItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.item_name} - Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Shopping List Details</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>Items in this List</Text>
          <FlatList
            data={shoppingListDetails.items}
            keyExtractor={item => item.id.toString()}
            renderItem={renderListItem}
          />
          <Text>Your Available Items</Text>
          <DisplayUserItems userId={null} shoppingListId={listId} onAddToList={handleAddToList} />
        </>
      )}
    </View>
  );
};

export default ShoppingListDetails;