import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayUserItems from './displayUserList'; // Leverage DisplayUserItems for displaying items

const ManageMyItems = ({ navigation }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser.id);
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  if (!userId) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Manage My Items</Text>

      {/* Button to add a new item */}
      <Button title="Add New Item" onPress={() => navigation.navigate('AddToUserList')} />

      {/* DisplayUserItems handles item display and management */}
      <DisplayUserItems userId={userId} context="manageItems" />
    </View>
  );
};

export default ManageMyItems;