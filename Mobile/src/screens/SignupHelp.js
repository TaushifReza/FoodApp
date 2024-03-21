import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ArrowUturnLeftIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';

const SignupHelp = () => {
  const navigation = useNavigation();
  return (
    <View className='flex-1 flex-col gap-5'>
    <View className='flex-row items-center'>
    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
    <ArrowUturnLeftIcon color={'black'} size={25} strokeWidth={2} style={{marginTop:61,marginLeft:15}}/>
    </TouchableOpacity>
    <Text style={{marginTop:61,marginLeft:94}} className='font-bold text-2xl text-blue-400'>Signup Help</Text>
    </View> 
    <View className='flex-col'>
    <Text style={{marginLeft:15}} className='text-lg text-blue-400'>What is signup as seller, signup as buyer and signup as delivery rider ?</Text>
    <Text style={{marginHorizontal:15}}>There are three types of users on this application. The user who sells the products are listed
    in seller account, the user who buys the products are listed in buyer accounts and the person who delivers the food are delivery riders.
    </Text>

    <Text style={{marginLeft:15}} className='text-lg text-blue-400 mt-4'>Can't i signup as seller. What is the difference in signup ?</Text>
    <Text style={{marginHorizontal:15}}>
    There is difference in signup as seller and signup as buyer as buyer doesn't need to have a business PAN number to buy foods.
    But the seller does. The signup forms are different as the user selects the options.
    </Text>

    <Text style={{marginLeft:15}} className='text-lg text-blue-400 mt-4'>Why there are two more options on SignUp as seller account ?</Text>
    <Text style={{marginHorizontal:15}}>
    Yetai Eats promotes the individual households to cook and sell their food online creating micro-enterprenuers. And as well as
    Hotels and Restaurants to sell their food online. 
    </Text>

    <Text style={{marginLeft:15}} className='text-lg text-blue-400 mt-4'>Which options Should I Select Creating Seller Account ?</Text>
    <Text style={{marginHorizontal:15}}>
    If you are thinking of selling your products staying, cooking at home and do not have an hotel/restaurants you can choose Individual
    cook option. If you already have hotels/restaurants and want to promote your products online you can choose Business Cook option respectively.
    </Text>

    <View className='bg-gray-200 h-14 rounded-3xl flex-row items-center' 
        style={{width:'85%',marginHorizontal:30,marginTop:20}}>
        <TextInput  placeholder='Enter Your Email' style={{width:'85%',marginLeft:3,height:30,paddingLeft:10}}/>
      </View>

    <TouchableOpacity>
    <View className='mt-5 ml-[30%] bg-blue-400 rounded-3xl justify-center items-center w-44 h-10'>
    <Text className='text-white'>Contact Us Via Email</Text>
    </View>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default SignupHelp