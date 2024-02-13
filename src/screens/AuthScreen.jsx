import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View className='flex items-center justify-between flex-1 mx-5'>
      <View className='items-center mt-10'>

        
      </View>
      <View className='w-full mb-5 text-center'>
        <Text className='my-4 mt-5 text-2xl font-bold text-white'>Welcome at Weftune!</Text>
        <TouchableOpacity
          className='items-center justify-center w-full px-4 py-4 my-1 bg-green-500 rounded-xl'
          onPress={handleLoginPress}
        >
          <Text className='font-semibold text-white text-[16px]'>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='items-center justify-center w-full px-4 py-4 my-1 bg-green-500 rounded-xl'
          onPress={handleRegisterPress}
        >
          <Text className='font-semibold text-white text-[16px]'>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;
