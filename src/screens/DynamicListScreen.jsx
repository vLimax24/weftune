import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
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

  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3.5;

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await axios.get(`https://www.weftune.com/api/fetchOneList/${listId}`);
        const responseData = response.data;
  
        // Set state variables with response data
        setItems(responseData.items);
        setName(responseData.name);
  
        // Fetch image URLs for each item
        const itemNames = responseData.items.map(item => item.itemName);
  
        const itemImageUrls = await Promise.all(itemNames.map(async (itemName) => {
          try {
            const itemResponse = await axios.get(`https://www.weftune.com/api/getItemData/${itemName}`);
            return itemResponse.data.imageUrl;
          } catch (error) {
            console.error(`Error fetching image URL for item ${itemName}:`, error);
            return null;
          }
        }));
        
        // Update the items with image URLs
        setItems(prevItems => {
          return prevItems.map((item, index) => {
            return {
              ...item,
              imageUrl: itemImageUrls[index]
            };
          });
        });
      } catch (error) {
        console.error('Error fetching list data:', error);
      }
    }
  
    const interval = setInterval(fetchListData, 5000);

    fetchListData();

    return () => clearInterval(interval);
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

  const handleItemDelete = async (itemName) => {
    try {
      // Send a POST request to the API endpoint to remove the item from the list
      await axios.post(`https://weftune.com/api/removeItemFromList/${listId}/${itemName}`);
  
      // Update the state by removing the deleted item from the items array
      setItems(prevItems => prevItems.filter(item => item.itemName !== itemName));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View>
      <ScrollView className='px-4 bg-gray-900' stickyHeaderIndices={[0]}>
        <View className='fixed flex-row items-center justify-between pt-10 pb-5 bg-gray-900'>
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
        <View className='flex-row flex-wrap items-center justify-center my-5'>
        {items.length === 0 ? (
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
            Hurra! Du bist fertig!
          </Text>
        ) : (
          items.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className='items-center justify-center bg-green-500 m-0.5 rounded-lg'
              style={{
                width: itemSize, 
                height: itemSize,
              }} 
              onPress={() => handleItemDelete(item.itemName)}
            >
              <View className='w-[50px] h-[50px]'>
                <Image source={{ uri: item.imageUrl }} className='flex-1 w-full h-full' resizeMode='contain'/>
              </View>
              <Text className='text-sm text-gray-500'>{item.customProperties.join(', ')}</Text>
              <Text className='text-white text-md'>{item.itemName}</Text>
            </TouchableOpacity>
          ))
        )}
        </View>
        <View className='mt-5 mb-32'>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} className='flex-row items-center justify-between px-3 py-3 bg-gray-800 mt-0.5' onPress={() => navigateToRoute(category[1])}
            style={{
              borderTopLeftRadius: index === 0 ? 10 : 0,
              borderTopRightRadius: index === 0 ? 10 : 0,
              borderBottomLeftRadius: index === categories.length - 1 ? 10 : 0,
              borderBottomRightRadius: index === categories.length - 1 ? 10 : 0,
          }} 
            >
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
