import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryActions';
import { Picker } from '@react-native-picker/picker';
import { Text, View, StyleSheet } from 'react-native';

const CategoryList = ({ selectedCategory, handleCategoryChange }) => {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!categories) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => handleCategoryChange(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2, // Add this to visualize the picker container
    borderColor: 'red', // Make it noticeable
  },
  picker: {
    color: 'black', // Make sure this contrasts with the background
    height: '50%', // Ensure it has enough height to be visible // Stretch it across the available width
  },
});

export default CategoryList;