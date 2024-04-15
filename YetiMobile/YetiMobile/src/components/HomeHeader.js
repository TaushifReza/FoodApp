import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'

const HomeHeader = () => {
  return (
    <View className='bg-gray-200 w-96 rounded-3xl ml-4 h-14 flex-row'>
    {/*This is for the location section*/}
    <View className='pl-4 pt-1 flex gap-1'>
    <Text className='font-thin text-base'>Your Location</Text>
    <Text className='font-light text-blue-600'>MC47+RP8, Belbari 56600, Nepal</Text>
    </View>
    {/*This is for the search section*/}
    <View className='ml-20 mt-4'>
    <TouchableOpacity>
    <MagnifyingGlassIcon size={33}/>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default HomeHeader