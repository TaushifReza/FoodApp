import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BaseUrl } from "../../Database/BaseUrl";

const RenderAllProducts = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
      className="ml-3 mr-3 "
      style={{ height: 230, width: 180 }}
    >
      <View className="">
        <View className="">
          <Image
            className="rounded-3xl"
            source={{ uri: item.image }}
            style={{ height: 170, width: 180 }}
          />
        </View>
        <View className="">
          <Text>{item.itemName}</Text>
          <Text>Rs.{item.price}</Text>
          <Text>{item.seller.businessName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RestaurantProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BaseUrl}MenuItem`);
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <View>
      <FlatList
        className="flex-row flex-wrap"
        data={allProducts}
        renderItem={({ item }) => <RenderAllProducts item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RestaurantProduct;
