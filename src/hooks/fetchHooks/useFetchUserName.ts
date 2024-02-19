import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchUserName = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON !== null) {
          const userData = JSON.parse(userDataJSON);
          setUserName(userData.name);
          setUserEmail(userData.email);
        }
      } catch (error) {
        setError(error); // Set error state if AsyncStorage operations fail
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    fetchUserName();

    const interval = setInterval(fetchUserName, 1000);

    return () => clearInterval(interval);
  }, []);

  return { userName, userEmail, error };
};

export default useFetchUserName;
