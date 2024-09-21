import React, { useState, useEffect } from 'react';
import { View, Button, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_SUCCESS } from '../../redux/actions/userActions';
import DisplayUserItems from '../userList/displayUserList'; // Correct path
import LogoutButton from '../auth/LogoutButton'; // Import LogoutButton
import Login from '../auth/Login'; // Import Login component
import Register from '../auth/Register'; // Import Register component

const App = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(true);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: JSON.parse(userData) });
      }
    };

    loadUserData();
    dispatch({ type: 'FETCH_CATEGORIES' });  // Fetch other required data
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    AsyncStorage.removeItem('user');
  };

  const navigateToManageItems = () => {
    navigation.navigate('ManageItems');
  };

  const navigateToShoppingLists = () => {
    navigation.navigate('ShoppingList');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={require('../../../assets/backgrounds/sharedshopbackground.jpeg')} style={{ width: '100%', height: '100%' }}>
        {isAuthenticated ? (
          <>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Welcome {user?.username || 'User'}</Text> 
            <DisplayUserItems userId={user?.id} /> 
            <Button title="Manage My Items" onPress={navigateToManageItems} />
            <Button title="Shopping Lists" onPress={navigateToShoppingLists} />
            <Button title="Logout" onPress={handleLogout} /> 
          </>
        ) : (
          <>
            {showLogin ? (
              <>
                <Login />
                <Button title="Go to Register" onPress={() => setShowLogin(false)} />
              </>
            ) : (
              <>
                <Register />
                <Button title="Go to Login" onPress={() => setShowLogin(true)} />
              </>
            )}
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default App;