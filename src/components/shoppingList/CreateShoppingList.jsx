// src/components/shoppingList/CreateShoppingList.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const CreateShoppingList = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create a New Shopping List</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CreateShoppingList;