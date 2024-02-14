import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';

// Define a mapping of categories to display texts
const categoryDisplayText = {
  OBST_GEMUESE: 'Obst & Gemüse',
  BROT_GEBACK: 'Brot & Gebäck',
  MILCH_KAESE: 'Milch & Käse',
  FLEISCH_FISCH: 'Fleisch & Fisch',
  ZUTATEN_GEWRZE: 'Zutaten & Gewürze',
  FERTIG_TIEFKUEHLPRODUKTE: 'Fertig- & Tiefkühlprodukte',
  GETREIDEPRODUKTE: 'Getreideprodukte',
  SNACKS_SUSSWAREN: 'Snacks & Süßwaren',
  GETRAENKE: 'Getränke',
  HAUSHALT: 'Haushalt',
  PFLEGE_GESUNDHEIT: 'Pflege & Gesundheit',
  TIERBEDARF: 'Tierbedarf',
  BAUMARKT_GARTEN: 'Baumarkt & Garten'
  // Add more categories as needed
};

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

const AddItemScreen = ({ route }) => {
    const navigation = useNavigation()
    const { category } = route.params;
    const { listId } = route.params
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await axios.get(`https://weftune.com/api/getItems/${category}`);
        setItems(responseData.data);
      } catch (error) {
        console.error('Error fetching list data:', error);
      }
    };
    
    fetchItems();
  }, [category]);

  useEffect(() => {
    const addSelectedItemsToList = async () => {
      // Implement functionality to add selected items to the list
    }

    addSelectedItemsToList()
  }, [selectedItems])

  const handleNavigate = (listId) => {
    navigation.navigate('DynamicListScreen', { listId: listId } );
  }

  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3.5;

  return (
    <ScrollView stickyHeaderIndices={[0]}>
        <TouchableOpacity className='flex-row pt-12 pb-6 ml-5 bg-gray-900' onPress={() => handleNavigate(listId)} activeOpacity={0.9}>
            <ChevronLeft size={28} color={'#fff'}/>
            {/* Use the display text based on the category */}
            <Text className='ml-5 text-xl font-bold text-white'>{categoryDisplayText[category]}</Text>
        </TouchableOpacity>
      <View className='flex-row flex-wrap items-center justify-center mt-10 mb-16'>
        {items.map((item, index) => (
            <TouchableOpacity 
            key={index} 
            style={{
                width: itemSize, 
                height: itemSize,
                borderTopLeftRadius: index === 0 ? 10 : 0,
                borderTopRightRadius: index === 2 ? 10 : 0,
                borderBottomLeftRadius: index === items.length - 3 ? 10 : 0,
                borderBottomRightRadius: index === items.length - 1 ? 10 : 0,
            }} 
            className='items-center justify-center bg-green-500 m-0.5'
            >
            <View className='w-16 h-16'>
                <Image source={{ uri: item.imageUrl }} className='flex-1 w-full h-full' resizeMode='contain'/>
            </View>
            <Text className='text-sm text-white'>{item.name}</Text>
            </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AddItemScreen;
