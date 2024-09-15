// src/components/categories/categoryList.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryActions';
import { Picker } from '@react-native-picker/picker';

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
    <Picker
      selectedValue={selectedCategory}
      onValueChange={(itemValue) => handleCategoryChange(itemValue)}
    >
      <Picker.Item label="Select Category" value="" />
      {categories.map((category) => (
        <Picker.Item key={category.id} label={category.name} value={category.id} />
      ))}
    </Picker>
  );
};

export default CategoryList;