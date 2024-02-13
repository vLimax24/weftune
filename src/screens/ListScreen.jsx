import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  const handleRedirectToNewList = () => {
      navigation.navigate('CreateListScreen')
  }

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON !== null) {
          const userData = JSON.parse(userDataJSON);
          setUserName(userData.name);
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    fetchUserName();

    const interval = setInterval(fetchUserName, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView className='px-5 pt-12 bg-gray-900'>
      <Text className='text-xl font-bold text-gray-300'>Welcome back, {userName}!</Text>
      <View className='mt-10'>
        {/* Here we need to map over all lists in the database the user is in */}
        <TouchableOpacity>
          <View className='flex-row items-center justify-between w-full px-5 py-12 bg-gray-500 h-fit rounded-xl'>
            <Text className='text-xl font-bold text-white'>Zuhause</Text>
            <TouchableOpacity className='items-center justify-center px-4 py-2 text-white bg-gray-300 rounded-full'>
              <Text className='text-w'>Go</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>


        {/* Creating Button for creating a new list */}

        <TouchableOpacity onPress={handleRedirectToNewList} className='mb-20'>
          <View className='flex-row items-center justify-center w-full px-5 py-6 mt-5 bg-green-500 h-fit rounded-xl'>
            <Text className='text-xl font-semibold text-white'>Create new List</Text>
          </View>
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  )
}

export default ListScreen