import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View className='flex items-center justify-between flex-1 mx-5'>
      <View className='items-center mt-10'>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/142538133?v=4' }}
          className='w-48 h-48 rounded-full'
        />
        <Text className='my-4 text-2xl font-bold'>Welcome!</Text>
      </View>
      <View className='w-full mb-5'>
        <TouchableOpacity
          className='px-4 py-4 justify-center items-center my-1 bg-[#0459D9] rounded-xl w-full'
          onPress={handleLoginPress}
        >
          <Text className='font-semibold text-white text-[16px]'>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='px-4 py-4 justify-center items-center my-1 rounded-xl bg-[#0459D9] w-full'
          onPress={handleRegisterPress}
        >
          <Text className='font-semibold text-white text-[16px]'>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;