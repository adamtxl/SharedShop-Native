import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddToShoppingList = ({ item, quantities, onQuantityChange, onAddToList }) => {
  if (!item) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={quantities[item.id]?.toString() || ''}
        onChangeText={(value) => onQuantityChange(item.id, value)}
      />
      <TouchableOpacity onPress={() => onAddToList(item.id, quantities[item.id] || 1)}>
        <Text style={styles.addButtonText}>Add to Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  quantityInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default AddToShoppingList;