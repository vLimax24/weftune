import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (err) {
      console.log(err);
      alert('Login Failed ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    console.log('google')
  }

  const handleGithub = async () => {
    console.log('github')
  }



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
        onPress={() => signIn()}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" /> // Show loader when loading
        ) : (
          <Text className='text-lg font-semibold text-white'>Login</Text> // Show text when not loading
        )}
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
      <View className='flex-row items-center justify-center'>
          <TouchableOpacity onPress={() => handleGoogle()}>
            <View className='items-center justify-center p-4 mx-4 border border-gray-300 rounded-lg'>
              <Image source={require('../assets/google.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGithub()}>
            <View className='items-center justify-center p-4 mx-4 border border-gray-300 rounded-lg'>
              <Image source={require('../assets/github.png')} />
            </View>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
