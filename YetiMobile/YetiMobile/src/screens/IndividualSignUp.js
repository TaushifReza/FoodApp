import { View, Text,TextInput, TouchableOpacity,Alert} from 'react-native'
import React, { useState } from 'react';
import {UserIcon,BriefcaseIcon,EnvelopeIcon,LockClosedIcon,PhoneIcon} from "react-native-heroicons/outline"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BaseUrl } from '../../Database/BaseUrl';

const IndividualSignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = () => {
    const signUpType = {
      username,
      email,
      password,
      phoneNumber,
    };
    axios.post(`${BaseUrl}Auth/register?signUpType=IndividualSignUp`, signUpType)
      .then(response => {
        // Handle success response
        console.log('Signup successful:', response.data);
        Alert.alert('Success', 'Account created successfully.', [{ text: 'OK', onPress: () => navigation.navigate('LogIn') }]);
      })
      .catch(error => {
        // Handle error response
        console.error('Signup error:', error);
        Alert.alert('Error', 'Failed to create account. Please try again.');
      });
  };

  return (
    //This is the main view of this screen
    <View className='flex-1 flex-col'>
    {/*This is the View That contains Header*/}
      <View>
      <Text className='mt-20 ml-6 font-extrabold text-yellow-400 text-3xl'>YetaiEats</Text>
      <Text className='ml-6 mt-3 font-thin text-lg'>Join YetaiEats Now!</Text>

      {/*This is the View That contains Forms for signup*/}
      <View className='h-[85%] bg-yellow-400 rounded-[50px] rounded-b-none'>

      {/* This Is the View for UserName form*/}
      <View className='bg-white w-[80%] h-12 rounded-[20px] mt-16 ml-10 flex-row items-center '>
      <UserIcon strokeWidth={2} size={30} color={'black'} style={{marginLeft:7}}/>
      <TextInput className='pl-1 w-[83%] h-7' placeholder='Enter Your UserName' value={username}
      onChangeText={setUsername}/>
      </View>

      {/* This Is the View for Gmail form*/}
      <View className='bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center'>
      <EnvelopeIcon strokeWidth={2} size={30} color={'black'} style={{marginLeft:7}}/>
      <TextInput className='pl-1 w-[83%] h-7' placeholder='Enter Your Email' value={email}
      onChangeText={setEmail}/>
      </View>

      {/* This Is the View for Location form*/}
      <View className='bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center '>
      <LockClosedIcon strokeWidth={2} size={30} color={'black'} style={{marginLeft:7}}/>
      <TextInput className='pl-1 w-[83%] h-7' placeholder='Enter Your Password' value={password}
      onChangeText={setPassword}/>
      </View>

      {/* This Is the View for Phone Number form*/}
      <View className='bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center'>
      <PhoneIcon strokeWidth={2} size={30} color={'black'} style={{marginLeft:7}}/>
      <TextInput className='pl-1 w-[83%] h-7' placeholder='Enter Your PhoneNumber' value={phoneNumber}
      onChangeText={setPhoneNumber}/>
      </View>
      
      <TouchableOpacity onPress={handleSignUp} className='bg-white mt-24 w-60 mx-20 h-12 rounded-2xl flex justify-center items-center'>
      <Text className='text-yellow-400 font-bold text-xl'>Create Account</Text>
      </TouchableOpacity>
      
      </View>
      </View>
    </View>
  )
}

export default IndividualSignUp