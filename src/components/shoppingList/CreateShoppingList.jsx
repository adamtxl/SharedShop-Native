import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createShoppingList } from '../../redux/actions/shoppingListActions';
import DisplayUserItems from '../userList/DisplayUserItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { clearCreatedList } from '../../redux/actions/shoppingListActions'; // Add this action

const CreateShoppingList = ({ navigation }) => {
  const [listName, setListName] = useState('');
  const [createdDate, setCreatedDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  const createdShoppingList = useSelector((state) => state.shoppingList?.createdList ?? null);
  const createError = useSelector((state) => state.shoppingList?.error ?? null);

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

  // Watch for shopping list creation success

  useEffect(() => {
    if (createdShoppingList) {
      setCreatedDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
  
      Alert.alert('Success', 'Shopping list created successfully!');
      
      // Check if the createdShoppingList has an `id` before navigating
      if (createdShoppingList.id) {
        navigation.navigate('ShoppingListDetails', { listId: createdShoppingList.id });
      }
  
      setListName('');
  
      // Dispatch action to clear the created shopping list to reset the state
      dispatch(clearCreatedList());
    }
  }, [createdShoppingList, dispatch]);
  


  const createList = () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name');
      return;
    }

    const listData = { user_id: userId, list_name: listName };
    dispatch(createShoppingList(listData));
  };

  if (!userId) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Create a New Shopping List</Text>
      <TextInput
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 20, paddingHorizontal: 10 }}
      />
      <Button title="Create List" onPress={createList} />
      {createError && <Text style={{ color: 'red' }}>{createError}</Text>}
    </View>
  );
};

export default CreateShoppingList;