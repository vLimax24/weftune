import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import axios from 'axios';
import { Settings, ArrowUpDown, ChevronRight, ChevronLeft } from 'lucide-react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Input from '../components/Input'
import { useNavigation } from '@react-navigation/native';

const DynamicListScreen = ({ route }) => {
  const navigation = useNavigation()
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([])
  const [background, setBackground] = useState('')
  const [theme, setTheme] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [category, setCategory] = useState('')
  const { listId } = route.params; // Accessing listId from route params

  const snapPoints = useMemo(() => ['30%', '70%'], [])

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await axios.get(`https://www.weftune.com/api/fetchOneList/${listId}`)
        const responseData = response.data;
        // Set state variables with response data
        setItems(responseData.items || []);
        setName(responseData.name || '');
        setUsers(responseData.users || []);
        setBackground(responseData.backgroundImage || '');
        setTheme(responseData.colorTheme || '');
      } catch (error) {
        console.error('Error fetching list data:', error);
      }
    }

    fetchListData();
  }, [listId]); // Make sure to include listId in the dependency array to re-fetch data when it changes

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  const categories = [
    ['Obst & Gemüse', 'OBST_GEMUESE'],
    ['Brot & Gebäck', 'BROT_GEBACK'],
    ['Milch & Käse', 'MILCH_KAESE'],
    ['Fleisch & Fisch', 'FLEISCH_FISCH'],
    ['Zutaten & Gewürze', 'ZUTATEN_GEWRZE'],
    ['Fertig- & Tiefkühlprodukte', 'FERTIG_TIEFKUEHLPRODUKTE'],
    ['Getreideprodukte', 'GETREIDEPRODUKTE'],
    ['Snacks & Süsswaren', 'SNACKS_SUSSWAREN'],
    ['Getränke', 'GETRAENKE'],
    ['Haushalt', 'HAUSHALT'],
    ['Pflege & Gesundheit', 'PFLEGE_GESUNDHEIT'],
    ['Tierbedarf', 'TIERBEDARF'],
    ['Baumarkt & Garten', 'BAUMARKT_GARTEN']
  ];

  const navigateToRoute = (category) => {
    navigation.navigate('Item', {category: category, listId: listId})
  }

  return (
    <View>
      <ScrollView className='px-5 pt-10 bg-gray-900'>
        <View className='fixed flex-row items-center justify-between'>
          <View className='flex-row items-center justify-center'>
            <ChevronLeft color={'#fff'} size={32} onPress={() => navigation.navigate('List')}/>  
          </View>
          <Text className='text-2xl font-bold text-white'>{name}</Text>
          <View className='p-3'>
            <TouchableOpacity>
              <Settings color={'#fff'} size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        {/* 
          View className='flex-row mt-3'>
            <TouchableOpacity className='flex-row px-3 py-2 border border-gray-400 rounded-md' onPress={toggleFilter}>
              <ArrowUpDown color={'#fff'} size={20}/>
              <Text className='ml-2 text-white'>Sort by</Text>
            </TouchableOpacity>
          </View>
        */}
        <View className='mt-5 mb-32'>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} className='flex-row items-center justify-between px-3 py-3 bg-gray-800 mt-0.5' onPress={() => navigateToRoute(category[1])}>
              <Text className='text-lg text-white'>{category[0]}</Text>
              <ChevronRight color={'#fff'} size={25}/>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className='absolute bottom-0 left-0 right-0 items-center justify-center pt-2 bg-gray-900 rounded-t-xl'>
        <Input
          placeholder="Search..."
          onChangeText={handleInputChange}
          inputValue={inputValue}
          width={320}
        />
      </View>

    </View>
  )
}

export default DynamicListScreen
