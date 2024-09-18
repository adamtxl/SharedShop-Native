import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const LogoutButton = ({ handleLogout }) => (
  <TouchableOpacity onPress={handleLogout} style={{ padding: 10 }}>
    <Text style={{ color: '#fff' }}>Logout</Text>  {/* Ensure the text is wrapped in <Text> */}
  </TouchableOpacity>
);

export default LogoutButton;