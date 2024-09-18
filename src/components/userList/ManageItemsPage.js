import React from 'react';
import { View, Button } from 'react-native';
import AddToUserList from './addToUserList';
import DisplayUserItems from './displayUserList';

const ManageItemsPage = ({ navigation }) => {
  return (
    <View>
      <AddToUserList />
      <DisplayUserItems />
      <Button title="Go to Shopping List" onPress={() => navigation.navigate('ShoppingList')} /> {/* Safe button title */}
    </View>
  );
};

export default ManageItemsPage;