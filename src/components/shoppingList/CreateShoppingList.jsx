import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayUserList from '../userList/displayUserList'; // Ensure this matches the actual file name
import moment from 'moment'; // for formatting the date

const CreateShoppingList = ({ navigation }) => {
  const [listName, setListName] = useState('');
  const [isListCreated, setIsListCreated] = useState(false);
  const [createdDate, setCreatedDate] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser.id);
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  const createList = () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name');
      return;
    }
    setIsListCreated(true);
    setCreatedDate(moment().format('MMMM Do YYYY, h:mm:ss a')); // easy to read date
  };

  if (!userId) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!isListCreated ? (
        <>
          <Text style={{ fontSize: 18 }}>Create a New Shopping List</Text>
          <TextInput
            placeholder="Enter list name"
            value={listName}
            onChangeText={setListName}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginVertical: 20,
              paddingHorizontal: 10,
            }}
          />
          <Button title="Create List" onPress={createList} />
        </>
      ) : (
        <>
          <Text style={{ fontSize: 18 }}>List Name: {listName}</Text>
          <Text style={{ marginVertical: 10 }}>Created on: {createdDate}</Text>
          <DisplayUserList userId={userId} context="createShoppingList" />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

export default CreateShoppingList;