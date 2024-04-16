import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BaseUrl } from "../../Database/BaseUrl";
import axios from "axios";

const RenderAllProducts = ({ item, index }) => {
  const navigation = useNavigation();

  // Check if the item has a valid id property
  if (!item || !item.id) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
      className="ml-3 mr-3 bg-blue-200 rounded-3xl"
      //style={{ height: 230, width: 180 }}
    >
      <View className="flex-row items-center gap-x-4">
        <View className="">
          <Image
            className="rounded-3xl"
            source={require("../../assets/images/5.jpg")} // Assuming you have an 'image' property in the seller profile
            style={{ height: 120, width: 130 }}
          />
        </View>
        <View className="gap-y-2">
          <Text className="text-xl font-bold">{item.name}</Text>
          <Text>Address: {item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HouseholdProduct = () => {
  const [sellerProfiles, setSellerProfiles] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchSellerProfiles = async () => {
      try {
        const response = await axios.get(`${BaseUrl}SellerProfile`);
        console.log("Response data:", response.data);

        if (response.data.isSuccess) {
          setSellerProfiles(response.data.result);
          setFetchError(null);
        } else {
          setFetchError(
            "Error fetching seller profiles: " + response.data.errorMessage
          );
        }
      } catch (error) {
        setFetchError("Error fetching seller profiles: " + error.message);
      }
    };
    fetchSellerProfiles();
  }, []);

  return (
    <View>
      {fetchError ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red" }}>{fetchError}</Text>
        </View>
      ) : (
        <FlatList
          className=""
          data={sellerProfiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RenderAllProducts item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

export default HouseholdProduct;
