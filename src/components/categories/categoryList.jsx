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

  console.log('Categories in component:', categories);

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
    width: '80%', // Adjust width as needed
    backgroundColor: 'white', // Light background for better visibility
    borderRadius: 10, // Rounded corners
    marginVertical: 10, // Some spacing above and below
  },
  picker: {
    color: 'black', // Text color to contrast against white background
  },
});

export default CategoryList;