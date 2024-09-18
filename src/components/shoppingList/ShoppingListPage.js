import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingLists } from '../../redux/actions/shoppingListActions'; 

const ShoppingListPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const shoppingLists = useSelector(state => state.shoppingList.lists); // Assuming you have this in your redux store
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchShoppingLists(user.id)); // Fetch shopping lists for the user on page load
  }, [dispatch, user]);

  const handleNewShoppingList = () => {
    // Logic for creating a new shopping list could go here
    // Navigate to a new page where the user creates a shopping list
    navigation.navigate('CreateShoppingList'); // Assuming you have a CreateShoppingList component
  };

  const renderShoppingList = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.name}</Text>
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
      <FlatList
        data={shoppingLists}
        keyExtractor={item => item.id.toString()}
        renderItem={renderShoppingList}
      />
    </View>
  );
};

export default ShoppingListPage;