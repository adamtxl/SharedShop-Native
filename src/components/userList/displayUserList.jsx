import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../redux/actions/userItemsActions';
import { addItemsToShoppingList } from '../../redux/actions/shoppingListActions';
import ItemList from './ItemList';
import AddToShoppingList from './AddToShoppingList';

const DisplayUserItems = ({ userId, context, shoppingListId }) => {
  const dispatch = useDispatch();
  const userItems = useSelector(state => state.userItems.items);
  const [expandedItems, setExpandedItems] = useState({});
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
    // Add the item to the shopping list
    dispatch(addItemsToShoppingList(shoppingListId, [{ id: itemId, quantity }]));
  };

  return (
    <View>
      <ItemList
        items={userItems}
        expandedItems={expandedItems}
        onToggleExpand={toggleExpand}
      />
      {context === 'createShoppingList' && (
        <AddToShoppingList
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          onAddToList={handleAddToList}
        />
      )}
    </View>
  );
};

export default DisplayUserItems;