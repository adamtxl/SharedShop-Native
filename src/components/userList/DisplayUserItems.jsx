import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserItems, deleteUserItem } from '../../redux/actions/userItemsActions';
import AddToShoppingList from './AddToShoppingList';
import ItemList from './ItemList';

const DisplayUserItems = ({ userId, context }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.userItems.items);
  const loading = useSelector(state => state.userItems.loading);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserItems(userId));
    }
  }, [dispatch, userId]);

  const handleToggleExpand = (itemId) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleDelete = (itemId) => {
    dispatch(deleteUserItem(itemId));
  };

  const handleAddToList = (itemId, quantity) => {
    console.log(`Add item ${itemId} with quantity ${quantity} to the shopping list`);
  };

  const handleQuantityChange = (itemId, quantity) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        quantity,
      },
    }));
  };

  if (loading) {
    return <Text>Loading items...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {items.length > 0 ? (
        <ItemList
          items={items}
          onToggleExpand={handleToggleExpand}
          expandedItems={expandedItems}
          onEdit={() => {}}
          onDelete={handleDelete}
        />
      ) : (
        <Text>No items available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  submitText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default DisplayUserItems;