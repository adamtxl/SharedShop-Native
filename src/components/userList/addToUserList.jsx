// src/components/userList/addToUserList.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUserItem } from '../../redux/actions/userItemsActions';
import CategoryList from '../categories/categoryList';

const AddToUserList = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?.id); // Extract user ID from state.user.user

  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' }); // Fetch categories on component mount
  }, [dispatch]);

  const handleInputChange = (name, value) => {
    if (name === 'itemName') {
      setItemName(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSubmit = () => {
    dispatch(createUserItem({ user_id: userId, item_name: itemName, category, quantity }));
    console.log('Item Name:', itemName);
    console.log('Category:', category);
    console.log('Quantity:', quantity);
    console.log('User ID:', userId);
    // Reset the input fields
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
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    color: 'white',
  },
});

export default AddToUserList;