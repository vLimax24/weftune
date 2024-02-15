// Import necessary modules
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Modal, StatusBar, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input'

// Define the display text for categories
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
};

// Define the AddItemScreen component
const AddItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const { listId } = route.params;
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customProperties, setCustomProperties] = useState('');

  // Fetch items based on the category
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch items from the category
        const responseCategory = await axios.get(`https://weftune.com/api/getItems/${category}`);
        const categoryItems = responseCategory.data;
        setItems(categoryItems);
  
        // Fetch items from the list
        const responseList = await axios.get(`https://weftune.com/api/getListItems/${listId}`);
        const listItems = responseList.data;
  
        // Check for items in the list that match the fetched category items
        const selectedItems = listItems.filter(listItem => categoryItems.some(categoryItem => categoryItem.name === listItem.itemName));
  
        // Update the state with the selected items
        setSelectedItems(selectedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [category, listId]);

  // Function to handle selecting an item
  const handleItemSelect = async (item) => {
    try {
      if (selectedItem && selectedItem.name === item.name) {
        // Deselect the item
        setSelectedItem(null);
        setSelectedItems(prevSelectedItems => prevSelectedItems.filter(selected => selected.itemName !== item.name));
        setModalVisible(false); // Close the modal

        await handleItemDeselect(item.name);
      } else {
        // Check if the item is already selected
        const alreadySelected = selectedItems.some(selected => selected.itemName === item.name);
        if (alreadySelected) {
          // Deselect the item
          setSelectedItem(null);
          setSelectedItems(prevSelectedItems => prevSelectedItems.filter(selected => selected.itemName !== item.name));
          setModalVisible(false); // Close the modal
        } else {
          // Select the item
          setSelectedItem(item);
          setSelectedItems(prevSelectedItems => [...prevSelectedItems, { itemName: item.name }]);
          setCustomProperties(''); // Reset custom properties
          setModalVisible(true); // Open the modal
        }
      }
    } catch (error) {
      console.error('Error selecting item:', error);
    }
  };

  // Function to handle adding an item to the list
  const handleAddItem = async () => {
    try {
      // Add the selected item to the list with custom properties
      const newItem = {
        itemName: selectedItem.name,
        customProperties: customProperties.split(',').map(property => property.trim())
      };
  
      // Send a POST request to the API endpoint to add the item to the list
      await axios.post(`https://weftune.com/api/addItemToList/${listId}`, newItem);
  
      // Update the state with the selected item and custom properties
      setSelectedItems([...selectedItems, newItem]);
      setCustomProperties('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding item to list:', error);
    }
  };

  // Function to handle deselecting an item
  const handleItemDeselect = async (itemName) => {
    try {
      // Send a POST request to the API endpoint to remove the item from the list
      await axios.post(`https://weftune.com/api/removeItemFromList/${listId}/${itemName}`);

      // Update the state by removing the item from the selected items
      setSelectedItems(prevSelectedItems => prevSelectedItems.filter(selected => selected.itemName !== itemName));
    } catch (error) {
      console.error('Error removing item from list:', error);
    }
  };

  // Function to navigate back
  const handleNavigate = () => {
    navigation.navigate('DynamicListScreen', { listId });
  };

  // Calculate item size based on screen width
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3.5;

  // Render the component
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <TouchableOpacity onPress={() => handleNavigate()} activeOpacity={0.9} className="flex-row pt-12 pb-6 ml-5 bg-gray-900">
        <ChevronLeft size={28} color={'#fff'}/>
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
              backgroundColor: (selectedItem && selectedItem.name === item.name) || selectedItems.some(selected => selected.itemName === item.name) ? 'rgb(248 113 113)' : 'rgb(34 197 94)'
            }} 
            onPress={() => handleItemSelect(item)}
            className='items-center justify-center bg-green-500 m-0.5'
          >
            <View className='w-16 h-16'>
                <Image source={{ uri: item.imageUrl }} className='flex-1 w-full h-full' resizeMode='contain'/>
            </View>
            <Text className='text-sm text-white max-w-[80%]'>{item.name}</Text>
            </TouchableOpacity>
        ))}
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)"/>
        <View className='bg-[rgba(0,0,0,0.5)] items-center justify-center flex-1' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='items-center justify-center px-6 pt-4 pb-4 bg-gray-800 rounded-2xl'>
            <Text className='my-2 text-lg font-bold text-white'>Füge noch ein paar Eigenschaften hinzu... (Komma seperiert)</Text>
            <Input
              onChangeText={text => setCustomProperties(text)}
              value={customProperties}
              placeholder="Eigenschaften"
              width={250}
            />
            <TouchableOpacity onPress={handleAddItem} className="w-[250px] items-center justify-center px-4 py-2 bg-green-500 rounded-md">
              <Text className='text-white'>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    </ScrollView>
  );
};

export default AddItemScreen;
