import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useState } from "react";
import {BackspaceIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const navigation =useNavigation();
  const { authData } = useContext(AuthContext);
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
    <Image source={require('../../assets/images/defultProfile.png')} 
    className='w-24 h-24 rounded-full ml-7 mt-8'/>
    </View>
    <View className='mt-4 ml-3'>
    <Text className='text-lg'>{authData.fullName}</Text>
    </View>
    </View>

    <View>
    <TouchableOpacity className='mt-20 ml-8 mr-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>My Name</Text>
    <Text className='font-thin'>{authData.fullName}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-10 ml-8 mr-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Phone Number</Text>
    <Text className='font-thin'>{authData.phoneNumber}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity className='mt-10 ml-8 mr-8'>
    <View className='items-center flex-row justify-between'>
    <Text className='text-xl'>Email</Text>
    <Text className='font-thin'>{authData.email}</Text>
    </View>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default Profile