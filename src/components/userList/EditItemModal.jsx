import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const EditItemModal = ({ visible, item, onSave, onCancel }) => {
  const [editItem, setEditItem] = useState(item);

  useEffect(() => {
    if (item) {
      setEditItem(item); // Sync modal state with selected item
    }
  }, [item]);

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
          <TextInput
            placeholder="Category"
            value={editItem?.category || ''}
            onChangeText={(text) => setEditItem({ ...editItem, category: text })}
            style={styles.input}
          />
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
});

export default EditItemModal;