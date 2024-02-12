import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NotebookTabs, CircleUser, CookingPot, Home } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View className='flex-row items-center justify-around pt-4 pb-6 bg-gray-600'>
        <TouchableOpacity onPress={() => handleTabPress('Register')}>
            <Home color={`${activeTab === 'Register' ? '#0459D9' : '#000'}`}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Auth')} className={`${activeTab === 'Auth'}`}>
            <NotebookTabs color={`${activeTab === 'Auth' ? '#0459D9' : '#000'}`}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Login')} className={`${activeTab === 'Auth'}`}>
            <CookingPot color={`${activeTab === 'Login' ? '#0459D9' : '#000'}`}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('List')} className={`${activeTab === 'Auth'}`}>
            <CircleUser color={`${activeTab === 'List' ? '#0459D9' : '#000'}`}/>
        </TouchableOpacity>
    </View>
  );
};

export default Navbar;
