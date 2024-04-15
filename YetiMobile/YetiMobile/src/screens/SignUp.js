import { View, Text, TouchableOpacity, Modal,Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {BackspaceIcon,ArrowRightIcon} from 'react-native-heroicons/outline'


const SignUp = () => {
    const navigation = useNavigation();
    const [openModal, setOpenModal] = useState(false);

    //This Function returns the modal component which allows users to select sub options
    const renderModal=()=>{
      return(
        <Modal visible={openModal} transparent={true} animationType='slide'>
        <View className='flex-1 justify-end bg-transparent items-center flex-col'>
        <View className='bg-white rounded-3xl rounded-b-none' style={{height:450,width:414}}>
        <TouchableOpacity onPress={()=>{setOpenModal(false)}}>
        <Text><BackspaceIcon size={40} strokeWidth={1} color={'red'} style={{marginTop:5}}/></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate('IndividualSignUp');setOpenModal(false)}} className='bg-gray-100 h-14 rounded-3xl flex-row items-center justify-center' 
        style={{width:230,marginHorizontal:80,marginTop:50}}>
        <Text className='font-bold text-xl text-yellow-400'>Individual Cook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate('BusinessSignUp');setOpenModal(false)}} className='bg-gray-100 h-14 rounded-3xl flex-row items-center justify-center' 
        style={{width:230,marginHorizontal:80,marginTop:50}}>
        <Text className='font-bold text-xl text-yellow-400'>Business Cook</Text>
        </TouchableOpacity>
        </View>
        </View>
        </Modal>
      )
    }

  return (
    //This Is the Main View for the entire screen
    <View className='bg-yellow-400 flex-1 flex-col justify-end'>

    {/* This View is for help section on top of header*/}
    <View className='flex-row justify-between mb-10 mr-5'>
    
    <TouchableOpacity onPress={()=>{navigation.navigate('SignupHelp')}}>
    <Text className='text-white font-semibold'>Need Some Help ?</Text>
    </TouchableOpacity>
    </View>

    {/* This View is the main body section of the screen which contains all the details of the screen */}
    <View className='bg-white rounded-[45px] h-[85%] rounded-b-none'>

    {/*Header Saying Getting Started on top of this view*/}
    <Text className='font-extrabold text-2xl' style={{marginLeft:25,marginTop:20}}>Getting Started</Text>
    <Text className='font-thin' style={{marginLeft:25,marginTop:1}}>Create Account To Continue</Text>

    {/*Main Image on the center of Screen*/}
    <Image source={require('../../assets/images/signup.png')} className='w-[75%] h-[35%] ml-12 mt-14'/>

    {/*Signup as Seller Button on the screen*/}
    <TouchableOpacity onPress={()=>{setOpenModal(true)}} className='bg-yellow-400 h-14 rounded-3xl flex-row items-center justify-center' 
    style={{width:'55%',marginHorizontal:'20%',marginTop:'8%'}}>
    <Text className='font-bold text-xl text-white'>Seller</Text>
    </TouchableOpacity>
    {renderModal()}

    {/*Signup as Delivery Rider Button on the screen*/}
    <TouchableOpacity onPress={()=>{navigation.navigate('DeliveryRiderSighup')}} className='bg-yellow-400 h-14 rounded-3xl flex-row items-center justify-center' 
    style={{width:'55%',marginHorizontal:'20%',marginTop:'8%'}}>
    <Text className='font-bold text-xl text-white'>Delivery Rider</Text>
    </TouchableOpacity>

    {/*Signup as Buyer Button on the screen*/}
    <TouchableOpacity onPress={()=>{navigation.navigate('BuyerSignUp')}} className='bg-yellow-400 h-14 rounded-3xl flex-row items-center justify-center' 
    style={{width:'55%',marginHorizontal:'20%',marginTop:'8%'}}>
    <Text className='font-bold text-xl text-white'>Buyer</Text>
    </TouchableOpacity>

    {/* This View is for Login Button below the screen*/}
    <View className='mt-8 items-center flex-row justify-center'>
    <Text >Already Have an Account ?</Text>

    {/*Login Button on the screen*/}
    <TouchableOpacity onPress={()=>{navigation.navigate('LogIn')}}>
    <Text className='ml-1 text-blue-400'>LogIn</Text>
    </TouchableOpacity>
    </View>

    </View>

    </View>
  )
}

export default SignUp