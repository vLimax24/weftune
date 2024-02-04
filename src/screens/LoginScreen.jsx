import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Register');
    
  };

  const handleLogin = () => {
    console.log('Logging in...');
  };

  return (
    <View className='items-center flex-1 px-5'>
      <Image source={require('../assets/wave.png')} className='absolute'/>
      <Text className='mt-[70px] text-white font-black text-[48px]'>Login</Text>
      <TextInput
        className='border border-[#0459D9] rounded-lg px-4 py-2 mb-4 w-full mt-[180px]'
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className='border border-[#0459D9] rounded-lg px-4 py-2 mb-4 w-full'
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className='bg-[#0459D9] rounded-lg py-3 px-6 w-full items-center'
        onPress={handleLogin}
      >
        <Text className='text-lg font-semibold text-white'>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={{ marginTop: 10, color: 'black'}}>
          Don't have an account? <Text className='text-[#0459D9]'>Register</Text> 
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#6A6363' }} />
        <Text style={{ color: '#6A6363', marginHorizontal: 10 }}>or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#6A6363' }} />
      </View>
    </View>
  );
};

export default LoginScreen;
