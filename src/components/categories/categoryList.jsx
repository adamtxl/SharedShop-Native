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
    borderWidth: 2,
    borderColor: 'gray',
    padding: 0,
  },
  picker: {
    height: 200,
    width: '100%',
  },
});

export default CategoryList;