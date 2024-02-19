import { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const useCreateList = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const createList = async (name, theme, background, ownerId, people) => {
    setLoading(true);
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

      // Navigate after successful list creation
      setTimeout(() => {
        navigation.navigate('List');
      }, 1000);
    } catch (e) {
      console.error('Error creating list:', e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createList };
};

export default useCreateList;
