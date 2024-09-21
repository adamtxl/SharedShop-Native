import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../redux/actions/userItemsActions';

const DisplayUserItems = ({ userId, isEditingShoppingList = false, onAddToList }) => {
  const dispatch = useDispatch();
  const userItems = useSelector(state => state.userItems.items);
  const loading = useSelector(state => state.userItems.loading);
  const error = useSelector(state => state.userItems.error);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store item quantities here

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserItems(userId));
    }
  }, [dispatch, userId]);

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities({
      ...quantities,
      [itemId]: quantity, // Track quantity for each item
    });
  };

  const renderItem = ({ item }) => {
    if (!item) {
      return <Text>No item data available</Text>;
    }
  
    const isExpanded = expandedItemId === item.id;
  
    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.accordionHeader}>
        <View>
          <Text style={styles.itemName}>{item.item_name || 'Unnamed Item'}</Text>
          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.label}>Description:</Text>
              <Text>{item.description || 'No description available'}</Text>
              <Text style={styles.label}>Category:</Text>
              <Text>{item.category || 'No category assigned'}</Text>
  
              {/* Buttons for editing or adding to shopping list */}
              <View style={styles.actionButtons}>
                {/* Edit Button */}
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => onEditItem(item.id)} // Trigger edit mode here
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
  
                {isEditingShoppingList && (
                  <>
                    <Text style={styles.label}>Quantity:</Text>
                    <TextInput
                      style={styles.quantityInput}
                      placeholder="Enter quantity"
                      keyboardType="numeric"
                      value={quantities[item.id] || ''}
                      onChangeText={(value) => handleQuantityChange(item.id, value)}
                    />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => onAddToList(item.id, quantities[item.id] || 1)} // Pass quantity
                    >
                      <Text style={styles.buttonText}>Add to Shopping List</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!userItems || userItems.length === 0) {
    return <Text>No items found.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userItems}
        renderItem={renderItem}
        keyExtractor={item => (item && item.id ? item.id.toString() : Math.random().toString())}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    width: '100%',
  },
  accordionHeader: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  expandedContent: {
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  quantityInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DisplayUserItems;