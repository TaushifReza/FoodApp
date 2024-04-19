import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import HomeHeader from "../components/HomeHeader";
import PopularItems from "../components/PopularItems";
import RestaurantProduct from "../components/RestaurantProduct";
import HouseholdProduct from "../components/HouseholdProduct";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { authData } = useContext(AuthContext);

  return (
    <ScrollView>
      <View className="mt-12">
        <HomeHeader />
        <Text className="ml-4 font-semibold text-xl mt-3 mb-2">
          Most Popular
        </Text>
        <PopularItems />
        <Text className="ml-4 font-semibold text-xl mt-3 mb-2">
          List of Restaurants
        </Text>
        <RestaurantProduct />
        <Text className="ml-4 font-semibold text-xl mt-3 mb-2">
          Household Products
        </Text>
        <HouseholdProduct />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
