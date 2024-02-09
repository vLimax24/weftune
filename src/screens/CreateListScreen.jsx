import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CreateListScreen = () => {
  const [theme, setTheme] = useState('');

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <ScrollView className='px-5 pt-12'>
      <Text className='text-2xl font-bold'>Create a new List</Text>
      <View className='mt-10'>
        <View className='flex flex-row flex-wrap items-center justify-center mt-5'>
          <TouchableOpacity
            className={`bg-slate-400 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${theme === 'backgroundImage-001.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectTheme('backgroundImage-001.jpg')}
            activeOpacity={1}
          >
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-500 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${theme === 'backgroundImage-002.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectTheme('backgroundImage-002.jpg')}
            activeOpacity={1}
          >
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-600 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${theme === 'backgroundImage-003.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectTheme('backgroundImage-003.jpg')}
            activeOpacity={1}  
          >
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-slate-700 w-[45%] mx-2 h-24 rounded-md mb-4 border-none ${theme === 'backgroundImage-004.jpg' && 'border-blue-500 border-2'}`}
            onPress={() => selectTheme('backgroundImage-004.jpg')}
            activeOpacity={1}  
          >
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateListScreen;