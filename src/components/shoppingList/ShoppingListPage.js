import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingLists, addItemsToShoppingList } from '../../redux/actions/shoppingListActions';

const ShoppingListPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const shoppingLists = useSelector(state => state.shoppingList?.lists || []); 
    const isLoading = useSelector(state => state.shoppingList?.isLoading); // Track loading state
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchShoppingLists(user.id)); // Fetch shopping lists for the user on page load
    }
  }, [dispatch, user]);

  const handleNewShoppingList = () => {
    navigation.navigate('CreateShoppingList');
  };

  const renderShoppingList = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.list_name}</Text>
      <Button
        title="View List"
        onPress={() => navigation.navigate('ShoppingListDetails', { listId: item.id })}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Shopping Lists</Text>
      <Button title="Start New Shopping List" onPress={handleNewShoppingList} />
      
      {isLoading ? ( 
        <ActivityIndicator size="large" color="#0000ff" /> // Show spinner while loading
      ) : (
        shoppingLists.length > 0 ? (
          <FlatList
            data={shoppingLists}
            keyExtractor={item => item.id.toString()}
            renderItem={renderShoppingList}
          />
        ) : (
          <Text>No shopping lists found. Start by creating a new one!</Text>
        )
      )}
    </View>
  );
};

export default ShoppingListPage;