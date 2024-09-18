import React, { useState } from 'react';
import { View, Button, FlatList, TextInput, Text } from 'react-native';

const ManageItemsPage = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [userItems, setUserItems] = useState([]);

  const addUserItem = () => {
    if (itemName) {
      setUserItems([...userItems, { name: itemName, id: Date.now() }]);
      setItemName('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter new item"
        value={itemName}
        onChangeText={setItemName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Add to User Items" onPress={addUserItem} />
      <FlatList
        data={userItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Button title="Go to Shopping List" onPress={() => navigation.navigate('ShoppingList')} />
    </View>
  );
};

export default ManageItemsPage;