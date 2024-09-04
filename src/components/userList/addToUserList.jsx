import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddToUserList = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');

    const handleInputChange = (name, value) => {
        if (name === 'itemName') {
            setItemName(value);
        } else if (name === 'category') {
            setCategory(value);
        }
    };

    const handleSubmit = () => {
        // Do something with the item name and category, e.g., add them to the shopping list
        console.log('Item Name:', itemName);
        console.log('Category:', category);
        // Reset the input fields
        setItemName('');
        setCategory('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Item Name:</Text>
            <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={(value) => handleInputChange('itemName', value)}
            />
            <Text style={styles.label}>Category:</Text>
            <TextInput
                style={styles.input}
                value={category}
                onChangeText={(value) => handleInputChange('category', value)}
            />
            <Button title="Add to List" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default AddToUserList;