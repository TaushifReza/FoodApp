import { View, Text} from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import React from 'react'
import HomeHeader from '../components/HomeHeader'
import PopularItems from '../components/PopularItems'
import Carousel from '../components/Carousel'
import RestaurantProduct from '../components/RestaurantProduct'
import HouseholdProduct from '../components/HouseholdProduct'

const HomeScreen = () => {
 
  return (
    <ScrollView className='mt-12'>
    <HomeHeader/>
    <Text className='ml-4 font-semibold text-xl mt-3 mb-2'>Offer Zone</Text>
    <Carousel/>
    <Text className='ml-4 font-semibold text-xl mt-3 mb-2'>Most Popular</Text>
    <PopularItems/>
    <Text className='ml-4 font-semibold text-xl mt-3 mb-2'>Restaurants Products</Text>
    <RestaurantProduct/>
    <Text className='ml-4 font-semibold text-xl mt-3 mb-3'>Household Products</Text>
    <HouseholdProduct/>
    </ScrollView>
  )
}

export default HomeScreen