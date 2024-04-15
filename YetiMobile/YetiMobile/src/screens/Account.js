import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {ArrowLeftOnRectangleIcon,ChevronRightIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const Account = () => {
  const navigation = useNavigation();
  return (
    <View>
    <View className='mt-14 justify-between items-center flex-row'>
    <Text className='font-medium text-2xl ml-36'>My Account</Text>
    <TouchableOpacity>
    <ArrowLeftOnRectangleIcon color={'black'} style={{marginRight:15}}/>
    </TouchableOpacity>
    </View>
    <View className='flex-row items-center'>
    <View>
    <Image source={require('../../assets/images/profile.jpg')} 
    className='w-24 h-24 rounded-full ml-7 mt-8'/>
    </View>
    <View className='mt-6 ml-3'>
    <Text className='text-lg'>Aryan Dhamala</Text>
    <Text className='font-thin mt-2'>aryandhamala8@gmail.com</Text>
    </View>
    </View>

    {/*This view is for navigating to different account related things */}
    <View>
    <TouchableOpacity className='mt-12 ml-8' onPress={()=>{navigation.navigate('Profile')}}>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Profile</Text>
    <ChevronRightIcon color={'black'}  style={{marginRight:15}}/>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-12 ml-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Payment Settings</Text>
    <ChevronRightIcon color={'black'}  style={{marginRight:15}}/>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-12 ml-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Order History</Text>
    <ChevronRightIcon color={'black'}  style={{marginRight:15}}/>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-12 ml-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Delivery Address</Text>
    <ChevronRightIcon color={'black'}  style={{marginRight:15}}/>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-12 ml-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>About Us</Text>
    <ChevronRightIcon color={'black'}  style={{marginRight:15}}/>
    </View>
    </TouchableOpacity>
    </View>
    <TouchableOpacity className='bg-yellow-400 rounded-2xl h-12 w-52 ml-24 mt-20'>
    <Text className='text-xl font-medium text-white text-center pt-2'>Log Out</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Account