import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryList from '../categories/categoryList'; // Import CategoryList here

const ItemForm = ({ itemName, category, description, quantities, onInputChange, onSubmit, submitText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={(value) => onInputChange('itemName', value)}
      />

      <Text style={styles.label}>Category:</Text>
      <CategoryList selectedCategory={category} handleCategoryChange={(value) => onInputChange('category', value)} />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(value) => onInputChange('description', value)}
      />

      {quantities && (
        <>
          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantities.toString() || ''}
            onChangeText={(value) => onInputChange('quantity', value)}
          />
        </>
      )}

      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.submitText}>{submitText}</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  submitText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default ItemForm;