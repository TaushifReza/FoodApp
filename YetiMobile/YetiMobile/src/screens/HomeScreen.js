import { View, Text } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useContext, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import PopularItems from "../components/PopularItems";
import Carousel from "../components/Carousel";
import RestaurantProduct from "../components/RestaurantProduct";
import HouseholdProduct from "../components/HouseholdProduct";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { authData } = useContext(AuthContext);
  return (
    <ScrollView className="mt-12">
      <HomeHeader />
      <Text className="ml-4 font-semibold text-xl mt-3 mb-2">Offer Zone</Text>
      <Carousel />
      <Text className="ml-4 font-semibold text-xl mt-3 mb-2">Most Popular</Text>
      <PopularItems />
      <Text className="ml-4 font-semibold text-xl mt-3 mb-2">
        List of Restaurants
      </Text>
      <RestaurantProduct />

      <HouseholdProduct />
    </ScrollView>
  );
};

export default HomeScreen;
