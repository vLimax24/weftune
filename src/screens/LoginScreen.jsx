import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Modal, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle, AlertOctagon } from 'lucide-react-native';
import Input from '../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false); // New state variable
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://weftune.com/api/checkCredentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        
        const user = await axios.get(`https://weftune.com/api/findUser/${email}`)

        const userData = user.data

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success modal if login is successful
        setSuccessModalVisible(true);
        setEmail('')
        setPassword('')
        // Navigate to List screen after 2 seconds
        setTimeout(() => {
          navigation.navigate('List');
          setSuccessModalVisible(false)
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    console.log('google')
  };

  const handleGithub = async () => {
    console.log('github')
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <View className='items-center flex-1 px-5 bg-gray-900'>
      <Text className='mt-[70px] text-white font-black text-[48px]'>Login</Text>
      <View className='items-center justify-center mt-16 text-center'>
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          inputValue={email}
          width={300}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          inputValue={password}
          width={300}
        />
        <TouchableOpacity
          className='items-center w-[300px] px-6 py-3 bg-green-500 rounded-lg'
          onPress={() => signIn()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className='text-lg font-semibold text-white'>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ marginTop: 10, color: 'white'}}>
            Don't have an account? <Text className='text-green-500'>Register</Text> 
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
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
      </View> */}

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)"/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center px-12 pt-8 pb-4 bg-gray-800 rounded-2xl'>
            <CheckCircle color="white" size={64} />
            <Text className='mt-2 text-xl font-bold text-white'>Login Successful!</Text>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!error}
        onRequestClose={() => {
          setError('');
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)"/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center px-12 pt-8 pb-4 bg-gray-800 rounded-2xl'>
            <AlertOctagon color="white" size={64} />
            <Text className='mt-2 text-xl font-bold text-white'>{error}!</Text>
            <TouchableOpacity onPress={() => setError('')} className='items-center justify-center px-12 py-2 mt-4 bg-red-600 rounded-md'>
              <Text className='text-white text-md'>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
