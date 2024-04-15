import { View, Text, TouchableOpacity,TextInput,Image,Alert } from 'react-native'
import axios from 'axios';
import React, { useState } from 'react';
import {UserIcon,LockClosedIcon,ArrowRightIcon} from "react-native-heroicons/outline"

import { useNavigation } from '@react-navigation/native'
import { BaseUrl } from '../../Database/BaseUrl';

const LogIn = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      navigation.navigate('HomeScreen')
      // const loginData = {
      //   username,
      //   password,
      // }; 
  
      // axios.post(`${BaseUrl}Auth/login`, loginData)
      //   .then(response => {
      //     // Handle successful login
      //     console.log('Login successful:', response.data);
      //     navigation.navigate('HomeScreen')
      //   })
      //   .catch(error => {
      //     // Handle login failure
      //     console.error('Login error:', error);
      //     Alert.alert('Error', 'Invalid username/email or password. Please try again.');
      //   });
    };

  return (
    //This is the main view of this screen
    <View className='flex-1 bg-yellow-400 flex-col justify-end'>

    {/* This View is for the Forget Password and skip button */}
      <View className='justify-end flex-row mb-10 mr-5'>

      {/*This is For Forget password Button*/}
      <TouchableOpacity>
      <Text className='text-white font-semibold'>Forget Your Password ?</Text>
      </TouchableOpacity>
      </View>

      {/* This View is for the main body section of this screen */}
      <View className='bg-white h-[85%] rounded-[45px] rounded-b-none'>

      {/*Header Greeting the user on top of this view*/}
      <View className='flex-row justify-between'>
      <Text className='font-extrabold text-2xl' style={{marginLeft:25,marginTop:20}}>Let's get something</Text>
      </View>
        <Text className='font-thin' style={{marginLeft:25,marginTop:1}}>Welcome Back ! Login to continue</Text>

        {/*Main Image on the center of Screen*/}
        <Image source={require('../../assets/images/login.png')} className='w-[75%] h-[35%] ml-12 mt-6'/>

        {/*This View is the text input field for username*/}
      <View className='bg-gray-100 h-14 rounded-3xl flex-row items-center' 
        style={{width:'85%',marginHorizontal:30,marginTop:8}}>
        <UserIcon strokeWidth={2} size={30} color={'black'} style={{marginLeft:7}}/>
        <TextInput onChangeText={setUsername}  placeholder='Enter Your UserName' style={{width:'85%',marginLeft:3,height:30}}/>
      </View>

      {/*This View is the text input field for Password*/}
      <View className='bg-gray-100 h-14 rounded-3xl flex-row items-center' 
        style={{width:'85%',marginHorizontal:30,marginTop:20}}>
        <LockClosedIcon strokeWidth={2} size={30} color={'black'} style={{marginLeft:7}}/>
        <TextInput onChangeText={setPassword}  placeholder='Enter Your Password' style={{width:'85%',marginLeft:3,height:30}}/>
      </View>

       {/*This View is for the button to Login to system*/}
      <TouchableOpacity onPress={handleLogin} className='rounded-2xl bg-yellow-400 items-center justify-center w-60 mx-20 mt-[10%] h-16'>
      <View >
      <Text className='font-semibold text-white text-2xl'>Log In</Text>
      </View>
      </TouchableOpacity>
      
      {/* This View is for Login Button below the screen*/}
    <View className='mt-8 items-center flex-row justify-center'>
    <Text >Do Not Have an Account ?</Text>

    {/*Login Button on the screen*/}
    <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
    <Text className='ml-1 text-blue-400'>SignUp</Text>
    </TouchableOpacity>
    </View>

      </View>
    </View>
  )
}

export default LogIn