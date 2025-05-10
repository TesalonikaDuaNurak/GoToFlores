import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import layar
import HomeScreen from './src/screens/Home';
import DiscoverScreen from './src/screens/Discover';
import ProfileScreen from './src/screens/Profile';
import EventScreen from './src/screens/festival';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Discover" component={DiscoverScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="festival" component={EventScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
