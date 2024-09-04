// src/components/app/App.js
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddToUserList from '../userList/addToUserList';


function App() {
  return (
    <Provider store={store}>
 <View style={styles.container}>
      <Text>Your home page is loading enough to render this text! </Text>
      <StatusBar style="auto" />
      <AddToUserList />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;