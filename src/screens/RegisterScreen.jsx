import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Registering...');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View className='items-center flex-1 px-5'>
      <Image source={require('../assets/wave.png')} className='absolute'/>
      <Text className='mt-[70px] text-white font-black text-[48px]'>Register</Text>
      <TextInput
        className='border border-[#0459D9] rounded-lg px-4 py-2 mb-4 w-full mt-[200px]'
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className='border border-[#0459D9] rounded-lg px-4 py-2 mb-4 w-full'
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
      <TextInput
        className='border border-[#0459D9] rounded-lg px-4 py-2 mb-4 w-full'
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        className='bg-[#0459D9] rounded-lg py-3 px-6 w-full items-center'
        onPress={handleRegister}
      >
        <Text className='text-lg font-semibold text-white'>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={{ marginTop: 10, color: 'black'}}>
          Already have an account? <Text className='text-[#0459D9]'>Login</Text> 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
