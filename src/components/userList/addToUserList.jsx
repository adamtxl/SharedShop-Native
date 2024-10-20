import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserItem } from '../../redux/actions/userItemsActions';
import ItemForm from './ItemForm'; // Import new ItemForm component


const AddToUserList = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?.id); // Ensure 'user' exists in your Redux store
  console.log('User ID:', userId);


  const handleInputChange = (name, value) => {
    if (name === 'itemName') setItemName(value);
    if (name === 'category') setCategory(value); // Handle category change
    if (name === 'description') setDescription(value);
  };

  const handleSubmit = () => {
    const newItem = {
      item_name: itemName,
      category_id: category, 
      user_id: userId,  
      description: description,
    };
    dispatch(createUserItem(newItem));
    console.log('Item added:', newItem);
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