import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, TextInput, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'

const Input = ({ placeholder, onChangeText, inputValue, clearInput, width }) => {
    const [placeholderAnim] = useState(new Animated.Value(1));
    const [focus, setFocus] = useState(false)
    const [inputText, setInputText] = useState('')

    const onFocus = () => {
        setFocus(true)
        Animated.timing(placeholderAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      };
    
      const onBlur = () => {
        if (inputText === '') {
            setFocus(false);
            Animated.timing(placeholderAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    useEffect(() => {
        setInputText(inputValue);
      }, [inputValue]);

    const handleInputChange = (text) => {
        setInputText(text);
        onChangeText(text); // Pass the text change to the parent component
        if (text !== '') {
            setFocus(true);
            Animated.timing(placeholderAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };
    
      const placeholderTranslateY = placeholderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 0],
      });
    
      const placeholderFontSize = placeholderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 14],
      });
    return (
        <View className='my-2'>
            <Animated.Text
                style={[
                {
                    transform: [{ translateY: placeholderTranslateY }],
                    fontSize: placeholderFontSize,
                },
                ]}
                className={`absolute text-gray-500 left-3 top-[13px] ${focus ? 'text-green-500' : 'text-gray-500'}`}
            >
                { placeholder }
            </Animated.Text>
            <TextInput
                onFocus={onFocus}
                onBlur={onBlur}
                style={{ width: width }} // Set width dynamically
                className='pb-1.5 pt-3 rounded-lg border-gray-400 border pl-3 text-white'
                placeholder=""
                onChangeText={handleInputChange}
                value={inputText}
                selectionColor={'white'}
            />
        </View>
    )
}

export default Input
