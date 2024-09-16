import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import AddToUserList from '../userList/addToUserList';
import Register from '../auth/Register';
import Login from '../auth/Login';
import { useSelector, useDispatch } from 'react-redux';

// Import your background image
import backgroundImage from '../../../assets/backgrounds/sharedshopbackground.jpeg';

function App() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const [showLogin, setShowLogin] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  const toggleAuthComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.innertext}>Your home page is loading enough to render this text!</Text>
        <StatusBar style="auto" />
        {isAuthenticated ? (
          <>
            <AddToUserList />
            {/* Add other authenticated components here */}
          </>
        ) : (
          <>
            {showLogin ? <Login /> : <Register />}
            <Button
              title={showLogin ? "Switch to Register" : "Switch to Login"}
              onPress={toggleAuthComponent}
            />
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', // Make sure the background image covers the full width
    height: '100%', // Make sure the background image covers the full height
  },
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'transparent', // Transparent so that the background shows through
    alignItems: 'center',
    justifyContent: 'center',
  },
  innertext: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;