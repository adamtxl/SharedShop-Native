import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import CategoryList from '../categories/categoryList'; // Import CategoryList component

const EditItemModal = ({ visible, item, onSave, onCancel }) => {
  const [editItem, setEditItem] = useState(item);

  useEffect(() => {
    if (item) {
      setEditItem(item); // Sync modal state with selected item
    }
  }, [item]);

  // Function to handle category change
  const handleCategoryChange = (selectedCategory) => {
    setEditItem({ ...editItem, category_id: selectedCategory }); // Set the selected category_id
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Edit Item</Text>
          <TextInput
            placeholder="Item Name"
            value={editItem?.item_name || ''}
            onChangeText={(text) => setEditItem({ ...editItem, item_name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={editItem?.description || ''}
            onChangeText={(text) => setEditItem({ ...editItem, description: text })}
            style={styles.input}
          />
          
          <Text style={{ alignSelf: 'flex-start' }}>Category:</Text>
          {/* Use CategoryList for category selection */}
          <View style={styles.categoryPickerContainer}>
            <CategoryList
              selectedCategory={editItem?.category_id || ''}
              handleCategoryChange={handleCategoryChange}
            />
          </View>

          <Button title="Save" onPress={() => onSave(editItem)} />
          <Button title="Cancel" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  categoryPickerContainer: {
    width: '100%', // Ensure the picker stretches to fill the available width
   
  },
});

export default EditItemModal;