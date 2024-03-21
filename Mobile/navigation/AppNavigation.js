import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '../src/screens/SignUp';
import SignupHelp from '../src/screens/SignupHelp';
import LogIn from '../src/screens/LogIn';
import BuyerSignUp from '../src/screens/BuyerSignUp';
import IndividualSignUp from '../src/screens/IndividualSignUp';
import BusinessSignUp from '../src/screens/BusinessSignUp';
import DeliveryRiderSighup from '../src/screens/DeliveryRiderSighup';
import Route from './Route';
import ProductDetails from '../src/screens/ProductDetails';
import Profile from '../src/screens/Profile';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='LogIn'>
    <Stack.Screen name='SignUp' component={SignUp}/>
    <Stack.Screen name='SignupHelp' component={SignupHelp}/>
    <Stack.Screen name='LogIn' component={LogIn}/>
    <Stack.Screen name='HomeScreen' component={Route}/>
    <Stack.Screen name='BuyerSignUp' component={BuyerSignUp}/>
    <Stack.Screen name='IndividualSignUp' component={IndividualSignUp}/>
    <Stack.Screen name='BusinessSignUp' component={BusinessSignUp}/>
    <Stack.Screen name='DeliveryRiderSighup' component={DeliveryRiderSighup}/>
    <Stack.Screen name='ProductDetails' component={ProductDetails}/>
    <Stack.Screen name='Profile' component={Profile}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation