import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './src/components/Navbar';
import ProfileScreen from './src/screens/ProfileScreen'
import ListScreen from './src/screens/ListScreen';
import CreateListScreen from './src/screens/CreateListScreen';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OfferScreen from './src/screens/OfferScreen';
import { StatusBar } from 'expo-status-bar';
import DynamicListScreen from './src/screens/DynamicListScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const checkUserData = async () => {
        try {
          const userDataJSON = await AsyncStorage.getItem('userData');
          if (userDataJSON !== null) {
            setUser('loggedIn');
          } else {
            setUser('loggedOut');
          }
        } catch (error) {
          console.error('Error checking user data in AsyncStorage:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      checkUserData();
    }, 100)

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const MyTheme = {
    dark: false,
    colors: {
      background: '#111827',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={user === 'loggedIn' ? 'List' : 'Auth'}>
        <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateListScreen" component={CreateListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Offer" component={OfferScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DynamicListScreen" component={DynamicListScreen} options={{ headerShown: false }} getId={({ params }) => params.listId}/>
      </Stack.Navigator>
      {user === 'loggedIn' && <Navbar />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
