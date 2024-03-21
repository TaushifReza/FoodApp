import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {BackspaceIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
  const navigation =useNavigation();
  return (
    <View>
    <View className='mt-14 flex-row'>
    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginLeft:15}}>
    <BackspaceIcon strokeWidth={3} size={30} color={'red'} />
    </TouchableOpacity>
    <Text className='font-medium text-2xl ml-28'>My Profile</Text>
    </View>
    
    <View className='items-center'>
    <View>
    <Image source={require('../../assets/images/profile.jpg')} 
    className='w-24 h-24 rounded-full ml-7 mt-8'/>
    </View>
    <View className='mt-4 ml-3'>
    <Text className='text-lg'>Aryan Dhamala</Text>
    <TouchableOpacity>
    <Text className='font-thin mt-1 ml-4'>Change Image</Text>
    </TouchableOpacity>
    </View>
    </View>

    <View>
    <TouchableOpacity className='mt-20 ml-8 mr-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>My Name</Text>
    <Text className='font-thin'>Aryan Dhamala</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-10 ml-8 mr-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Phone Number</Text>
    <Text className='font-thin'>9819398642</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-10 ml-8 mr-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Email</Text>
    <Text className='font-thin'>aryandhamala8@gmail.com</Text>
    </View>
    </TouchableOpacity>
    </View>
    <TouchableOpacity className='bg-yellow-400 rounded-2xl h-12 w-52 ml-24 mt-20'>
    <Text className='text-xl font-medium text-white text-center pt-2'>Save Changes</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Profile