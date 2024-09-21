import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DisplayUserList from '../userList/displayUserList'; // Ensure this matches the actual file name
import moment from 'moment'; // for formatting the date

const CreateShoppingList = ({ navigation }) => {
  const [listName, setListName] = useState('');
  const [isListCreated, setIsListCreated] = useState(false);
  const [createdDate, setCreatedDate] = useState(null);

  const createList = () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name');
      return;
    }
    setIsListCreated(true);
    setCreatedDate(moment().format('MMMM Do YYYY, h:mm:ss a')); // easy to read date
  };

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
          <DisplayUserList shoppingListName={listName} />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

export default CreateShoppingList;