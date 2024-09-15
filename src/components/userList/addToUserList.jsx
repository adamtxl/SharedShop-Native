import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CategoryList from '../categories/categoryList';

const AddToUserList = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleInputChange = (name, value) => {
    if (name === 'itemName') setItemName(value);
    if (name === 'quantity') setQuantity(value);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Item added:', { itemName, category, quantity });
    setItemName('');
    setCategory('');
    setQuantity('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={(value) => handleInputChange('itemName', value)}
      />
      <Text style={styles.label}>Category:</Text>
      <CategoryList selectedCategory={category} handleCategoryChange={handleCategoryChange} />
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={(value) => handleInputChange('quantity', value)}
        keyboardType="numeric"
      />
      <Button title="Add to List" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
});

export default AddToUserList;