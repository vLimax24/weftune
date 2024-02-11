import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CreateListScreen from './src/screens/CreateListScreen';
import LoginScreen from './src/screens/LoginScreen';
import ListScreen from './src/screens/ListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native'

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON !== null) {
          setUser('loggedIn');
        }
      } catch (error) {
        console.error('Error checking user data in AsyncStorage:', error);
      } finally {
        setIsLoading(false); // Update loading state when useEffect is done
      }
    };

    checkUserData();
  }, []);

  // Render loading indicator while waiting for useEffect to finish
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user === 'loggedIn' ? 'List' : 'Auth'}>
        <>
          <Stack.Screen name="List" component={ListScreen} options={{headerShown: false}}/>
          <Stack.Screen name="CreateListScreen" component={CreateListScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
