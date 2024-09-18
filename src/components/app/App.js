import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddToUserList from '../userList/addToUserList';
import Register from '../auth/Register';
import Login from '../auth/Login';
import DisplayUserItems from '../userList/displayUserList'; // Ensure this uses FlatList internally
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser, LOGIN_USER_SUCCESS } from '../../redux/actions/userActions';

function App() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  
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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.innertext}>Your home page is loading enough to render this text!</Text>
      {isAuthenticated && (
        <>
          <Text>Welcome {user.username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
          <AddToUserList />
        </>
      )}
    </View>
  );

  const renderAuthButtons = () => (
    <View>
      {showLogin ? <Login /> : <Register />}
      <Button title={showLogin ? 'Register' : 'Login'} onPress={toggleAuthComponent} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={[]}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={!isAuthenticated && renderAuthButtons}
        renderItem={null} // You can leave this as null since you're only using header and footer
        keyExtractor={() => 'dummy'} // Avoids warnings about missing key
      />
      {isAuthenticated && <DisplayUserItems userId={user.id} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  innertext: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;