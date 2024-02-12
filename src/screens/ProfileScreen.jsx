import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pencil } from 'lucide-react-native'


const ProfileScreen = () => {
    const [username, setUserName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState('')
    const [newName, setNewName] = useState('')
    const [nameChangeModal, setNameChangeModal] = useState(false)

    useEffect(() => {
        const fetchUserName = async () => {
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
    
        fetchUserName();
      }, []);

    const toggleNameChangeModal = () => {
        setNameChangeModal(!nameChangeModal)
    }

    const changeUsername = async () => {
        
    }  
  return (
    <ScrollView className='px-5 pt-12 bg-gray-900'>
      <Text className='text-2xl font-bold text-white'>Profile</Text>
      <View className='items-center justify-center mt-16'>
        <Image source={{ uri: avatar }} className='w-32 h-32 mb-3 rounded-full' />
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
          <View className='items-center justify-center px-12 pt-4 pb-4 bg-gray-800 rounded-2xl'>
            <View className='flex-row items-center justify-center mb-5'>
                <Pencil color="white" size={20} />
                <Text className='ml-2 text-xl font-bold text-white'>Change Username</Text>
            </View>
            <TextInput
                value={newName}
                onChangeText={setNewName}
                className='py-2 pl-2 pr-48 border border-gray-600 rounded-md'
            >

            </TextInput>
            <TouchableOpacity className='items-center justify-center px-12 py-2 mt-4 bg-green-600 rounded-md'>
              <Text className='text-white text-md'>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>


  )
}

export default ProfileScreen