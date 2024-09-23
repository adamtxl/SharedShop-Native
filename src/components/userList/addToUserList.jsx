import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserItem } from '../../redux/actions/userItemsActions';
import ItemForm from './ItemForm'; // Import new ItemForm component

const AddToUserList = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    if (name === 'itemName') setItemName(value);
    if (name === 'category') setCategory(value); // Handle category change
    if (name === 'description') setDescription(value);
  };

  const handleSubmit = () => {
    const newItem = {
      item_name: itemName,
      category_id: category,  // Make sure category_id is passed correctly
      user_id: 7,  // Example user ID
      description: description,
    };
    dispatch(createUserItem(newItem));
    setItemName('');
    setCategory('');
    setDescription('');
  };

  return (
    <ItemForm
      itemName={itemName}
      category={category}
      description={description}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      submitText="Add to User List"
    />
  );
};

export default AddToUserList;