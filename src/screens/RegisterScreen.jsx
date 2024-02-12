import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Modal, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle, AlertOctagon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Input from '../components/Input'

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const avatarImage = `https://ui-avatars.com/api/?name=${username}&length=2&background=0459D9&color=fff&size=128`
  

  const navigation = useNavigation();

  const signUp = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    // Validate password
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const url = 'https://weftune.com/api/createUser';
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
          "name": username,
          "avatarImage": avatarImage,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const user = await axios.get(`https://weftune.com/api/findUser/${email}`)

      const userData = user.data
      console.log(userData)

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    
      // Show success modal
      setSuccessModalVisible(true);

    } catch (error) {
      console.error('Error:', error);
      
    } finally {
      setLoading(false);
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setUsername("")
      setError(''); // Clear error message
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleModalClick = () => {
    navigation.navigate('List')
    setSuccessModalVisible(false);
  }

  return (
    <View className='items-center flex-1 px-5 bg-gray-900'>
      <Text className='mt-[70px] text-gray-200 font-black text-[31px]'>Welcome at Weftune!</Text>
      <View className='mt-16 mb-5'>
              <Input
                        placeholder="Username"
                        onChangeText={(text) => setUsername(text)}
                        inputValue={username}
                        width={300}
              />
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
              <Input
                        placeholder="Confirm Password"
                        onChangeText={(text) => setConfirmPassword(text)}
                        inputValue={confirmPassword}
                        width={300}
              />
      </View>
      <TouchableOpacity
        className='items-center w-[300px] px-6 py-3 bg-green-500 rounded-lg'
        onPress={() => signUp()}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className='text-lg font-semibold text-white'>Register</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={{ marginTop: 10, color: 'white'}}>
          Already have an account? <Text className='text-green-500'>Login</Text> 
        </Text>
      </TouchableOpacity>

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

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center px-12 pt-8 pb-4 bg-gray-800 rounded-2xl'>
            <CheckCircle color="white" size={64} />
            <View>
                <Text className='mt-2 text-xl font-bold text-white'>Successfully Verified!</Text>
                <TouchableOpacity onPress={() => handleModalClick()} className='items-center justify-center px-12 py-2 mt-4 bg-green-600 rounded-md'>
                  <Text className='text-white text-md'>Dashboard</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterScreen;
