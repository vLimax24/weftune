import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateListScreen = () => {
  const [theme, setTheme] = useState('');
  const [background, setBackground] = useState('');

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const selectBackground = (selectedBackground) => {
    setBackground(selectedBackground);
  };

  return (
    <ScrollView className='px-5 pt-12'>
      <Text className='text-2xl font-bold'>Create a new List</Text>
      <View className='mt-10'>
        <TextInput type="text" className='mx-2 border-b-2'placeholder='Family'/>
        <View className='flex flex-row flex-wrap items-center justify-center mt-5'>
          <TouchableOpacity
            className={`bg-slate-400 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${background === 'backgroundImage-001.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectBackground('backgroundImage-001.jpg')}
            activeOpacity={0.6}
          >
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-500 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${background === 'backgroundImage-002.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectBackground('backgroundImage-002.jpg')}
            activeOpacity={0.6}
          >
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-600 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${background === 'backgroundImage-003.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectBackground('backgroundImage-003.jpg')}
            activeOpacity={0.6}  
          >
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-700 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${background === 'backgroundImage-004.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectBackground('backgroundImage-004.jpg')}
            activeOpacity={0.6}  
          >
          </TouchableOpacity>
        </View>
      </View>
      <View className='mx-2 mt-5'>
        <Text className='text-lg font-semibold'>Want to add some people?</Text>
        <View className='flex-row items-center mt-5'>
          <TextInput type="text" className='w-4/5 p-2 pl-4 mr-4 border rounded-xl'placeholder='johndoe21'/>
          <TouchableOpacity className='flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full'>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View className='mx-2 mt-5'>
        <Text className='text-lg font-semibold'>select a color theme</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className='flex flex-row mt-3'>
            <TouchableOpacity className={`w-16 h-10 mr-1 bg-green-100 rounded-md ${theme === 'bg-green-100' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-100')}/>
            <TouchableOpacity className={`w-16 h-10 mx-1 bg-green-200 rounded-md ${theme === 'bg-green-200' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-200')}/>
            <TouchableOpacity className={`w-16 h-10 mx-1 bg-green-300 rounded-md ${theme === 'bg-green-300' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-300')}/>
            <TouchableOpacity className={`w-16 h-10 mx-1 bg-green-400 rounded-md ${theme === 'bg-green-400' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-400')}/>
            <TouchableOpacity className={`w-16 h-10 mx-1 bg-green-500 rounded-md ${theme === 'bg-green-500' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-500')}/>
            <TouchableOpacity className={`w-16 h-10 mx-1 bg-green-600 rounded-md ${theme === 'bg-green-600' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-600')}/>
            <TouchableOpacity className={`w-16 h-10 mx-1 bg-green-700 rounded-md ${theme === 'bg-green-700' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-700')}/>
            <TouchableOpacity className={`w-16 h-10 ml-1 bg-green-800 rounded-md ${theme === 'bg-green-800' && 'border-blue-500 border-2'}`} onPress={() => selectTheme('bg-green-800')}/>
          </View>
        </ScrollView>
      </View>

    </ScrollView>
  );
};

export default CreateListScreen;