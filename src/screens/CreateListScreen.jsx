import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal, StatusBar } from 'react-native';
import { Plus, CheckCircle } from 'lucide-react-native'; // Assuming you have imported the necessary icons
import Input from '../components/Input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateListScreen = () => {
  const [theme, setTheme] = useState('');
  const [background, setBackground] = useState('');
  const [name, setName] = useState('');
  const [people, setPeople] = useState([]);
  const [personText, setPersonText] = useState('');
  const [clearInput, setClearInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false); // New state variable for success modal

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const selectBackground = (selectedBackground) => {
    setBackground(selectedBackground);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON !== null) {
          const userData = JSON.parse(userDataJSON);
          setOwnerId(userData._id);
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    fetchUserId();

    const interval = setInterval(fetchUserId, 1000);

    return () => clearInterval(interval);
  }, []);

  const addPersonToState = () => {
    if (personText.trim() !== '') {
      if (!people.includes(personText)) {
        setPeople(prevPeople => [...prevPeople, personText]);
      } else {
        setError('Person already added!');
        setPersonText('');
        return;
      }
      setPersonText('');
    }
  };

  const checkUserExists = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await axios.get(`https://weftune.com/api/checkUserExists/${personText}`);
      const userData = user.data;
      if (userData === true) {
        addPersonToState();
      } else {
        setError("Username doesn't exist!");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removePerson = (index) => {
    setPeople(prevPeople => {
      const updatedPeople = [...prevPeople];
      updatedPeople.splice(index, 1);
      return updatedPeople;
    });
  };

  const createList = async () => {
    try {
      const responseCreateList = await axios.post('https://weftune.com/api/createList', {
        name: name,
        colorTheme: theme,
        backgroundImage: background,
        userId: ownerId,
      });

      const listId = responseCreateList.data._id;

      await Promise.all(
        people.map(async (person) => {
          try {
            await axios.post(
              `https://www.weftune.com/api/addPersonToList/${listId}/${person}`
            );
          } catch (error) {
            console.error('Error adding person to list:', error);
          }
        })
      );

      setSuccessModalVisible(true); // Show success modal on successful list creation
    } catch (e) {
      console.error('Error creating list:', e);
    }
  };
  

  return (
    <ScrollView className='px-5 pt-12' scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)"/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center px-12 pt-8 pb-4 bg-gray-800 rounded-2xl'>
            <CheckCircle color="rgb(34 197 94)" size={64} />
            <Text className='mt-2 text-xl font-bold text-white'>Liste erstellt!</Text>
          </View>
        </View>
      </Modal>
      <View className='flex-row items-center justify-between'>
        <Text className='text-2xl font-bold text-white'>Create a new List</Text>
        <TouchableOpacity className='px-2 py-1 bg-green-500 rounded-md' onPress={createList}>
          <Text className='text-white text-md'>Create</Text>
        </TouchableOpacity>
      </View>
      <View className='items-center justify-center mt-10'>
        <Input
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          inputValue={name}
          width={300}
        />
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
        <Text className='text-lg font-semibold text-white'>Want to add some people?</Text>
        <View className='mt-3'>
          <View className='flex-row items-center justify-center'>
            <Input
              placeholder="Email"
              onChangeText={(text) => {
                setPersonText(text);
              }}
              inputValue={personText}
              width={240}
              clearInput={clearInput}
            />
            <TouchableOpacity className='flex items-center justify-center w-12 h-12 ml-5 bg-green-500 rounded-lg' onPress={checkUserExists}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Plus size={20} color={'#fff'} />
            )}
          </TouchableOpacity>
            
          </View>
          <View className='text-left'>
            {error && <Text className='text-red-600'>{error}</Text>}
          </View>
        </View>
        <View className='mt-2'>
          {people.length > 0 && (
            <Text className='font-semibold text-white text-md'>People added:</Text>
          )}
          <View className='mt-2'>
            {people.map((person, index) => (
              <View key={index} className="flex flex-row items-center justify-between mb-2">
                <Text className="mr-2 text-white text-md">{person}</Text>
                <TouchableOpacity onPress={() => removePerson(index)} className='px-2 py-1 bg-red-600 rounded-md'>
                  <Text className="text-white">Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View className='mx-2 mt-5 mb-20'>
        <Text className='text-lg font-semibold text-white'>Color Theme</Text>
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