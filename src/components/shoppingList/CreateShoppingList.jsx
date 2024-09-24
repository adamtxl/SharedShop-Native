import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { createShoppingList } from '../../redux/actions/shoppingListActions';
import DisplayUserItems from '../userList/DisplayUserItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const CreateShoppingList = ({ navigation }) => {
  const [listName, setListName] = useState('');
  const [shoppingListId, setShoppingListId] = useState(null); // Save shoppingList ID after creation
  const [createdDate, setCreatedDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser.id);
      }
    };
    fetchUserId();
  }, []);

  const createList = () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name');
      return;
    }

    // Dispatch the create shopping list action
    const listData = { user_id: userId, list_name: listName };
    dispatch(createShoppingList(listData))
      .then(response => {
        // Set the shopping list ID and creation date
        setShoppingListId(response.payload.id);
        setCreatedDate(moment().format('MMMM Do YYYY, h:mm:ss a'));

        // Show success message
        Alert.alert('Success', 'Shopping list created successfully!');

        // Clear input
        setListName('');

        // Redirect to the newly created shopping list
        navigation.navigate('ShoppingListDetails', { listId: response.payload.id });
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to create the shopping list');
      });
  };

  if (!userId) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!shoppingListId ? (
        <>
          <Text>Create a New Shopping List</Text>
          <TextInput
            placeholder="Enter list name"
            value={listName}
            onChangeText={setListName}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 20, paddingHorizontal: 10 }}
          />
          <Button title="Create List" onPress={createList} />
        </>
      ) : (
        <>
          <Text>List Name: {listName}</Text>
          <Text>Created on: {createdDate}</Text>
          {/* Display items and allow user to add items to this shopping list */}
          <DisplayUserItems userId={userId} context="createShoppingList" shoppingListId={shoppingListId} />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

export default CreateShoppingList;