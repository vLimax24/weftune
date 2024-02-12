import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NotebookTabs, CircleUser, CookingPot, Home } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('List');
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View className='flex-row items-center justify-around pt-4 pb-6 bg-gray-900'>
        <TouchableOpacity onPress={() => handleTabPress('Register')}>
            <Home color={`${activeTab === 'Register' ? '#22c55e' : '#5f6b85'}`}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('List')} className={`${activeTab === 'Auth'}`}>
            <NotebookTabs color={`${activeTab === 'List' ? '#22c55e' : '#5f6b85'}`}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Login')} className={`${activeTab === 'Login'}`}>
            <CookingPot color={`${activeTab === 'Login' ? '#22c55e' : '#5f6b85'}`}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Profile')} className={`${activeTab === 'List'}`}>
            <CircleUser color={`${activeTab === 'Profile' ? '#22c55e' : '#5f6b85'}`}/>
        </TouchableOpacity>
    </View>
  );
};

export default Navbar;
