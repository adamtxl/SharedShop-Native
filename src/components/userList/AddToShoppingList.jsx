import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddToShoppingList = ({ item, quantity, onQuantityChange, onAddToList }) => {
  if (!item) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name: {item.item_name}</Text>
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={(value) => onQuantityChange(item.id, value)}
      />
      <TouchableOpacity onPress={() => onAddToList(item.id, quantity)}>
        <Text style={styles.addButtonText}>Add to Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 },
  addButtonText: { color: '#007BFF', fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 },
});

export default AddToShoppingList;