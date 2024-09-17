import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../redux/actions/userItemsActions';
import { Card } from 'react-native-paper';

const DisplayUserItems = ({ userId }) => {
  const dispatch = useDispatch();
  const userItems = useSelector(state => state.userItems.items);
  const loading = useSelector(state => state.userItems.loading);
  const error = useSelector(state => state.userItems.error);

  useEffect(() => {
    console.log('Fetching user items for userId:', userId);
    dispatch(fetchUserItems(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log('User items:', userItems);
  }, [userItems]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={item.item_name} />
      <Card.Content>
        <Text style={styles.itemText}>{item.description || "No description available"}</Text>
      </Card.Content>
    </Card>
  );

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
    <FlatList
      data={userItems}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    width: '100%',
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default DisplayUserItems;