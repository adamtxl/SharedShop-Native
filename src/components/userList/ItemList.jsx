import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';

const ItemList = ({ items, onToggleExpand, expandedItems, onEdit }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onToggleExpand(item.id)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.item_name}</Text>
            {expandedItems[item.id] && (
              <View style={styles.expandedContent}>
                <Text>Description: {item.description}</Text>
                <Text>Category: {item.category_name || 'No category assigned'}</Text>
                <Button title="Edit" onPress={() => onEdit(item)} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  expandedContent: {
    marginTop: 10,
  },
});

export default ItemList;