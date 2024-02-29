import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, TextInput, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pencil, ChevronLeft, CheckCircle, Settings } from 'lucide-react-native'
import Input from '../components/Input'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


const ProfileScreen = () => {
    const [username, setUserName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState('')
    const [newName, setNewName] = useState('')
    const [nameChangeModal, setNameChangeModal] = useState(false)
    const [nameChangeSuccessModal, setNameChangeSuccessModal] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

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

    const logOut = async () => {
      await AsyncStorage.removeItem('userData')
      navigation.navigate('Auth')
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

    const [fontsLoaded] = useFonts({
      'Rounded-Black': require('../assets/font/RoundedBlack.otf'),
    });
  return (
    <ScrollView className='px-5 pt-12 bg-background'>
      <View className='flex-row justify-between'>
        <Text className='text-2xl text-[#CDCDCD]' style={styles.font}>Profil</Text>
        <TouchableOpacity className='p-2.5 rounded-full bg-[#112824]'>
          <Settings size={20} className='text-[#CDCDCD]'/>
        </TouchableOpacity>
      </View>
      <View className='flex-row items-center justify-center mt-12'>
        <Image source={{ uri: avatar || 'https://ui-avatars.com/api/?name=vLimax&length=2&background=112824&color=CDCDCD&size=72'}} className='w-[72px] h-[72px] mb-3 rounded-full' />
        <View>
            <Text className='text-xl font-semibold text-white' style={styles.font}>{username}</Text>
            <Text className='text-[#858A88]' style={styles.font}>{email}</Text>
        </View>
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

        <View className='items-center justify-center mt-10'>
          <TouchableOpacity className='items-center justify-center w-64 py-3 bg-red-600 rounded-lg' onPress={() => logOut()}>
            <Text className='text-white'>Logout</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>


  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Rounded-Black',
  }
})