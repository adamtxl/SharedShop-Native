import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import { Button } from 'react-native'; 
import { AppRegistry } from 'react-native';
import App from './src/components/app/App';
import ShoppingListPage from './src/components/shoppingList/ShoppingListPage';
import CreateShoppingList from './src/components/shoppingList/CreateShoppingList'; 
import ManageItemsPage from './src/components/userList/ManageItemsPage';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from './src/redux/actions/userActions';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(logoutUser());
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={App}
          options={{
            title: 'Home',
            headerRight: () => (
              <Button
                title="Logout" 
                onPress={handleLogout}
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingListPage}
          options={{
            title: 'Shopping List',
            headerRight: () => (
              <Button
                title="Logout"
                onPress={handleLogout}
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="ManageItems"
          component={ManageItemsPage}
          options={{
            title: 'Manage Items',
            headerRight: () => (
              <Button
                title="Logout"
                onPress={handleLogout}
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="CreateShoppingList" // Add this screen
          component={CreateShoppingList} // Use the newly created component
          options={{
            title: 'Create New List',
            headerRight: () => (
              <Button
                title="Logout"
                onPress={handleLogout}
                color="#fff"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Root = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);