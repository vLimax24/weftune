import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserLists = (userEmail:any) => {
  const [userLists, setUserLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://weftune.com/api/fetchLists/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user lists');
        }
        const data = await response.json();
        setUserLists(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user lists:', error.message);
        setIsLoading(false);
      }
    };

    fetchUserLists();
  }, [userEmail]);

  return { userLists, isLoading };
};

export default useUserLists;
