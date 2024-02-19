import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FileQuestion, ChevronRight } from 'lucide-react-native';
import useUserLists from '../hooks/fetchHooks/useFetchUserLists';
import useFetchUserName from '../hooks/fetchHooks/useFetchUsername'; // Import the custom hook

const ListScreen = () => {
  const navigation = useNavigation();
  const { userName, userEmail } = useFetchUserName(); // Use the custom hook here
  const { userLists, isLoading } = useUserLists(userEmail);

  const handleRedirectToNewList = () => {
    navigation.navigate('CreateListScreen');
  };

  const handleNavigate = (listId) => {
    navigation.navigate('DynamicListScreen', { listId });
  };

  return (
    <ScrollView className='px-5 pt-12 bg-gray-900'>
      <Text className='text-xl font-bold text-gray-300'>Welcome back, {userName}!</Text>
      <View className='mt-10'>
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : userLists.length === 0 ? (
          <View className='items-center justify-center mb-5'>
            <FileQuestion color={'#fff'} size={96}/>
            <Text className='mt-5 text-white text-md'>You don't have any lists yet!</Text>
          </View>
        ) : (
          userLists.map((list) => (
            <TouchableOpacity key={list._id} className={`mt-2`} onPress={() => handleNavigate(list._id)}>
              <View className={`border-${list.colorTheme} flex-row items-center justify-between w-full px-5 py-12 border-2 rounded-xl`}>
                <Text className='text-xl font-bold text-white'>{list.name}</Text>
                <TouchableOpacity className={`items-center justify-center px-4 py-2 text-white bg-${list.colorTheme} rounded-full`} onPress={() => handleNavigate(list._id)}>
                  <ChevronRight color={'#fff'} size={20}/>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity onPress={handleRedirectToNewList} className='mb-20'>
          <View className='flex-row items-center justify-center w-full px-5 py-6 mt-5 bg-green-500 h-fit rounded-xl'>
            <Text className='text-xl font-semibold text-white'>Create new List</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ListScreen;
