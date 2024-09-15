// src/components/categories/categoryList.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CategoryList = ({ selectedCategory, handleCategoryChange }) => {
  const categories = useSelector((state) => state.category);
  console.log('categories:', categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  return (
    <select
      id="category"
      name="category"
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value)}
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryList;