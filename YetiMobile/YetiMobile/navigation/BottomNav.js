import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../src/screens/HomeScreen'
import Cart from '../src/screens/Cart'
import Account from '../src/screens/Account'
import Maps from '../src/screens/Maps'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const BottomNav = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
    <Tab.Screen name='Home' component={HomeScreen}
     options={{tabBarIcon:({color,size})=>(<Ionicons name="home" size={size} color={color} />)}}/>  
    <Tab.Screen name='Maps' component={Maps}
    options={{tabBarIcon:({color,size})=>(<MaterialCommunityIcons name="google-maps" size={size} color={color}/>)}}/>
    <Tab.Screen name='Cart' component={Cart}
    options={{tabBarIcon:({color,size})=>(<MaterialCommunityIcons name="cart-arrow-down" size={size} color={color} />)}}/>
    <Tab.Screen name='Account' component={Account}
    options={{tabBarIcon:({color,size})=>(<MaterialCommunityIcons name="account" size={size} color={color}/>)}}/>
    </Tab.Navigator>
  )
}

export default BottomNav