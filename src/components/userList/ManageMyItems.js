import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

const ManageMyItems = ({ navigation, items }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Manage My Items</Text>

      {/* Button to add a new item */}
      <Button 
        title="Add New Item" 
        onPress={() => navigation.navigate('AddItemScreen')} 
      />

      {/* FlatList to show user's items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10 }}>
            <Text>{item.name}</Text>
            <Button 
              title="Edit" 
              onPress={() => navigation.navigate('EditItemScreen', { itemId: item.id })} 
            />
          </View>
        )}
      />
    </View>
  );
};

export default ManageMyItems;