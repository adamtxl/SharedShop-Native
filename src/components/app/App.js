import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import AddToUserList from '../userList/addToUserList';
import Register from '../auth/Register';
import Login from '../auth/Login';
import DisplayUserItems from '../userList/displayUserList';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser, LOGIN_USER_SUCCESS } from '../../redux/actions/userActions';

import backgroundImage from '../../../assets/backgrounds/sharedshopbackground.jpeg';

function App() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  console.log(showLogin);
  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: JSON.parse(userData) });
      }
    };

    loadUserData();
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  const toggleAuthComponent = () => {
    setShowLogin(!showLogin);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Text style={styles.innertext}>Your home page is loading enough to render this text!</Text>
      <StatusBar style="auto" />
      {isAuthenticated ? (
        <>
          <AddToUserList />
          <View style={{ marginVertical: 20 }} /> {/* Add some spacing */}
          <DisplayUserItems userId={user.id} />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          {showLogin ? <Login /> : <Register />}
          <Button title={showLogin ? "Switch to Register" : "Switch to Login"} onPress={toggleAuthComponent} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innertext: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 50,
  },
});

export default App;