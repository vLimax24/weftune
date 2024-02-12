import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Modal, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle, AlertOctagon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

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
        onPress={() => signUp()}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className='text-lg font-semibold text-white'>Register</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={{ marginTop: 10, color: 'black'}}>
          Already have an account? <Text className='text-[#0459D9]'>Login</Text> 
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
