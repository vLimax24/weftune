import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';


const OfferScreen = () => {

  const snapPoints = useMemo(() => ['30%', '70%'], [])
  return (
    <View className='flex-1 bg-gray-900'>
      <BottomSheet snapPoints={snapPoints} index={0}>
        <View className='bg-gray-400'>
          <Text>Test</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default OfferScreen