import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { FileQuestion, ChevronRight } from 'lucide-react-native';


const ListScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userLists, setUserLists] = useState([]);

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
          setUserEmail(userData.email);
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    fetchUserName();

    const interval = setInterval(fetchUserName, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
          const response = await fetch(`https://weftune.com/api/fetchLists/${userEmail}`);
          if (!response.ok) {
              throw new Error('Failed to fetch user lists');
          }
          const data = await response.json();
          setUserLists(data);
          return data;
      } catch (error) {
          console.error('Error fetching user lists:', error.message);
          return null;
      }
  };

  const interval = setInterval(fetchUserLists, 1000);

  return () => clearInterval(interval);
  }, [userEmail])

  const handleNavigate = (listId) => {
    navigation.navigate('DynamicListScreen', { listId: listId } );
}

  return (
    <ScrollView className='px-5 pt-12 bg-gray-900'>
      <Text className='text-xl font-bold text-gray-300'>Welcome back, {userName}!</Text>
      <View className='mt-10'>
        {/* Here we need to map over all lists in the database the user is in */}
        {userLists.length === 0 ? (
          <View className='items-center justify-center mb-5'>
            <FileQuestion color={'#fff'} size={96}/>
            <Text className='mt-5 text-white text-md'>You don't have any lists yet!</Text>
          </View>
        ) : (
          // Mapping over userLists if available
          userLists.map((list) => (
            <TouchableOpacity key={list._id} className='mt-2' onPress={() => handleNavigate(list._id)}>
              <View className={`flex-row items-center justify-between w-full px-5 py-12 border-2 border-${list.colorTheme} rounded-xl`}>
                <Text className='text-xl font-bold text-white'>{list.name}</Text>
                <TouchableOpacity className={`items-center justify-center px-4 py-2 text-white bg-${list.colorTheme} border rounded-full`} onPress={() => handleNavigate(list._id)}>
                  <ChevronRight color={'#fff'} size={20}/>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}


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