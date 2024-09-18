import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_SUCCESS } from '../../redux/actions/userActions';
import DisplayUserItems from '../userList/displayUserList'; // Correct path

const App = () => {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isAuthenticated ? (
        <>
          <Text>Welcome {user?.username || 'User'}</Text> 
          <DisplayUserItems userId={user?.id} /> 
          <Button title="Logout" onPress={handleLogout} /> 
        </>
      ) : (
        <Text>Please login to continue</Text>
      )}
    </View>
  );
};

export default App;