import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const ListScreen = () => {
  const navigation = useNavigation()

  const handleRedirectToNewList = () => {
      navigation.navigate('CreateListScreen')
  }

  return (
    <ScrollView className='px-5 pt-12'>
      <Text className='text-xl font-bold'>Welcome back, Martin!</Text>
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
          <View className='flex-row items-center justify-center w-full px-5 py-6 mt-5 border-2 border-gray-500 h-fit rounded-xl'>
            <Text className='text-xl font-semibold'>Create new List</Text>
          </View>
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  )
}

export default ListScreen