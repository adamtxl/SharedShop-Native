import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems, updateUserItem } from '../../redux/actions/userItemsActions';
import ItemList from './ItemList';
import AddToShoppingList from './AddToShoppingList';
import EditItemModal from './EditItemModal';

const DisplayUserItems = ({ userId, context }) => {
  const dispatch = useDispatch();
  const userItems = useSelector(state => state.userItems.items);
  const [expandedItems, setExpandedItems] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserItems(userId));
    }
  }, [dispatch, userId]);

  const toggleExpand = (itemId) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities({ ...quantities, [itemId]: value });
  };

  const handleAddToList = (itemId, quantity) => {
    console.log(`Item ${itemId} added to list with quantity: ${quantity}`);
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleSaveEdit = (updatedItem) => {
    dispatch(updateUserItem(updatedItem)); // Don't pass `id` separately, it's already part of `updatedItem`
    setEditItem(null);
  };

  return (
    <View>
      <ItemList
        items={userItems}
        expandedItems={expandedItems}
        onToggleExpand={toggleExpand}
        onEdit={handleEdit}
      />
      {context === 'createShoppingList' && (
        <AddToShoppingList
          item={editItem}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          onAddToList={handleAddToList}
        />
      )}
      <EditItemModal
        visible={!!editItem}
        item={editItem}
        onSave={handleSaveEdit}
        onCancel={() => setEditItem(null)}
      />
    </View>
  );
};

export default DisplayUserItems;