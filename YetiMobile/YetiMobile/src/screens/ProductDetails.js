import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {StarIcon,BackspaceIcon} from 'react-native-heroicons/solid'
import {ClockIcon,PlusCircleIcon,MinusCircleIcon,} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import MoreItems from '../components/MoreItems';
import { cart } from '../../Database/CartItems';


const ProductDetails = ({route}) => {
    const navigation = useNavigation()
    const {product}=route.params

    const handleAddToCart =()=>{
      cart.push(product)
    }
  return (
    <View className='absolute'>
    <View>
    <Image source={{uri:product.image}} className='rounded-b-3xl' style={{height:340,width:415}}/>
    </View>
    <View style={{width:'90%'}} className='bg-gray-200 relative left-5 bottom-9 h-48 rounded-3xl'>
    <View className='items-center'>
    <Image source={{ uri: product.seller.StoreProfile }} className='rounded-full mt-2' style={{height:70,width:70}}/>
    <Text className='font-bold text-xl'>{product.seller.businessName}</Text>
    </View>
    <View className='ml-7 mt-2 flex-row items-center'>
    <Text className='text-lg mr-2'>Rating</Text>
    <StarIcon color={'yellow'} stroke={'black'}/>
    <Text className='ml-2 text-lg'>{product.seller.storeRating}</Text>
    </View>
    <View className='ml-7 mt-2 flex-row items-center'>
    <ClockIcon/>
    <Text className='text-lg ml-2'>{product.time}</Text>
    </View>
    </View>

    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{bottom:'49%',position:'relative', marginLeft:10}}>
    <BackspaceIcon strokeWidth={3} size={30} color={'red'} />
    </TouchableOpacity>

    <Text className='bottom-12 ml-6 font-semibold text-xl text-yellow-400'>{product.itemName}</Text>
    
    <View className='ml-7 mt-2 flex-row items-center bottom-12'>
    <Text className='text-lg mr-2'>Rating</Text>
    <StarIcon color={'yellow'} stroke={'black'}/>
    <Text className=' ml-2 text-lg'>{product.itemRating}</Text>
    <Text className='ml-44 text-lg text-red-600'>Rs.{product.price}</Text>
    </View>
    <View className='flex-row justify-evenly bottom-2'>
    <TouchableOpacity onPress={handleAddToCart} style={{borderColor:'yellow'}} className='bg-yellow-400 rounded-2xl h-12 w-80'>
    <Text className='text-xl font-medium text-white text-center pt-2'>Add to Cart</Text>
    </TouchableOpacity>
    </View>
    <Text className='text-center text-base top-2'>
    More from {product.seller.businessName}
    </Text>
    <View className='top-7'>
    <MoreItems/>
    </View>
    </View>
  )
}

export default ProductDetails