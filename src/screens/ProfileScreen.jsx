import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, TextInput, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pencil, ChevronLeft, CheckCircle } from 'lucide-react-native'
import Input from '../components/Input'


const ProfileScreen = () => {
    const [username, setUserName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState('')
    const [newName, setNewName] = useState('')
    const [nameChangeModal, setNameChangeModal] = useState(false)
    const [nameChangeSuccessModal, setNameChangeSuccessModal] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (text) => {
      setInputValue(text);
    };

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userDataJSON = await AsyncStorage.getItem('userData');
            if (userDataJSON !== null) {
              const userData = JSON.parse(userDataJSON);
              setUserName(userData.name);
              setAvatar(userData.avatarImage);
              setEmail(userData.email);
            }
          } catch (error) {
            console.error('Error retrieving user data from AsyncStorage:', error);
          }
        };
    
        fetchUserData();
      }, []);

    const toggleNameChangeModal = () => {
        setNameChangeModal(!nameChangeModal)
    }

    const toggleNameChangeSuccessModal = () => {
        setNameChangeSuccessModal(!nameChangeSuccessModal)
    }

    const changeUsername = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://weftune.com/api/changeUsername/${email}/${inputValue}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error(`Error updating user: ${response.statusText}`);
            }
        
            const data = await response.json();

            await AsyncStorage.setItem('userData', JSON.stringify(data.user));

            setUserName(data.user.name);
            setAvatar(data.user.avatarImage);

            return data;
          } catch (error) {
            console.error("Error updating user:", error);
            throw error;
          } finally {
            toggleNameChangeModal();
            setLoading(false);
            toggleNameChangeSuccessModal(true)
          }
    }  
  return (
    <ScrollView className='px-5 pt-12 bg-gray-900'>
      <Text className='text-2xl font-bold text-white'>Profile</Text>
      <View className='items-center justify-center mt-16'>
        <Image source={{ uri: avatar || 'https://ui-avatars.com/api/?name=Default+Name&length=2&background=0459D9&color=8c8b8b&size=128'}} className='w-32 h-32 mb-3 rounded-full' />
        <TouchableOpacity className='flex-row items-center justify-center' onPress={() => toggleNameChangeModal()}>
            <Text className='text-xl font-semibold text-white'>{username}</Text>
            <Pencil className='ml-2 text-white' size={16}/>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={nameChangeModal}
        onRequestClose={() => {
            toggleNameChangeModal()
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center pt-4 pb-4 bg-gray-800 w-72 rounded-2xl'>
            <View className='flex-row items-center justify-start w-64 mb-5'>
                <TouchableOpacity onPress={() => toggleNameChangeModal()}>
                    <ChevronLeft color="white" size={24}/>
                </TouchableOpacity>
                <Text className='ml-6 text-xl font-bold text-white'>Change Username</Text>
            </View>
            <Input
                placeholder="New Username"
                onChangeText={handleInputChange}
                inputValue={inputValue}
                width={250}
            />
            <TouchableOpacity className='items-center justify-center w-[250px] py-2.5 mt-4 bg-green-600 rounded-lg' onPress={() => changeUsername()}>
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                    <Text className='text-white text-md'>Change</Text>
                )}  
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={nameChangeSuccessModal}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center px-12 pt-8 pb-4 bg-gray-800 rounded-2xl'>
            <CheckCircle color="white" size={64} />
            <View>
                <Text className='mt-2 text-xl font-bold text-white'>Successfully Changed!</Text>
                <TouchableOpacity onPress={() => toggleNameChangeSuccessModal()} className='items-center justify-center px-12 py-2 mt-4 bg-green-600 rounded-md'>
                  <Text className='text-white text-md'>Close</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>


  )
}

export default ProfileScreen