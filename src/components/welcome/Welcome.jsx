import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ user, navigateToManageItems, navigateToShoppingLists }) => {
  const [lastLogin, setLastLogin] = useState(null);
  const [shoppingListStats, setShoppingListStats] = useState({});

  useEffect(() => {
    const fetchLastLogin = async () => {
      try {
        const loginDate = await AsyncStorage.getItem('lastLogin');
        if (loginDate) {
          setLastLogin(loginDate);
        }
      } catch (error) {
        console.error('Error fetching last login date:', error);
      }
    };

    const fetchShoppingListStats = async () => {
      // Simulate a fetch call to get shopping list statistics
      const stats = {
        totalLists: 5,
        activeLists: 2,
      };
      setShoppingListStats(stats);
    };

    fetchLastLogin();
    fetchShoppingListStats();
  }, []);

  return (
    <View style={styles.overlay}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome back, {user?.username || 'User'}!</Text>
        {lastLogin && (
          <Text style={styles.infoText}>Last Login: {new Date(lastLogin).toLocaleString()}</Text>
        )}
        <Text style={styles.infoText}>You have {shoppingListStats.totalLists} shopping lists, with {shoppingListStats.activeLists} currently active.</Text>
        <Text style={styles.instructions}>
          To get started, tap on "Manage My Items" to add new items that can be added to shopping lists, or tap on "Shopping Lists" to start a new shopping list.
        </Text>
        <Button title="Manage My Items" onPress={navigateToManageItems} />
        <Button title="Shopping Lists" onPress={navigateToShoppingLists} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay to darken the background image
  },
  textContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)', // Semi-transparent background for text
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark color for better contrast
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Text shadow for additional contrast
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginVertical: 15,
  },
});

export default Welcome;