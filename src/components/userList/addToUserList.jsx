import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import CategoryList from '../categories/categoryList';
import { useDispatch } from 'react-redux';
import { createUserItem } from '../../redux/actions/userItemsActions'; // Import the action creator

const AddToUserList = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState(''); // Add description state
  const dispatch = useDispatch(); // Initialize dispatch

  const handleInputChange = (name, value) => {
    if (name === 'itemName') setItemName(value);
    if (name === 'description') setDescription(value); // Handle description change
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = () => {
    // Prepare new item data
    const newItem = {
      item_name: itemName,      // Map `itemName` to `item_name`
      category_id: category,    // Map `category` to `category_id`
      user_id: 7,               // Include `user_id` (adjust as necessary)
      description: description, // Include description
    };
  
    // Dispatch the action to create a new user item
    dispatch(createUserItem(newItem));
  
    // Reset form fields
    setItemName('');
    setCategory('');
    setDescription(''); // Reset description
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
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(value) => handleInputChange('description', value)} // Handle description input
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add to List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
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
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddToUserList;