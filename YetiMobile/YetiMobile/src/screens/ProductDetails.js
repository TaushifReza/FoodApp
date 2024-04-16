import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  StarIcon,
  BackspaceIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/solid";
import {
  ClockIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import MoreItems from "../components/MoreItems";
import { cart } from "../../Database/CartItems";
import { BaseUrl } from "../../Database/BaseUrl";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params || {};
  const [foodItem, setFoodItem] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      const fetchFoodItem = async () => {
        try {
          const response = await axios.get(
            `${BaseUrl}FoodItem/GetAllFoodItem?id=${id}`
          );
          console.log("Response data:", response.data);

          if (response.data.isSuccess) {
            setFoodItem(response.data.result);
            setFetchError(null);
          } else {
            setFetchError(
              "Error fetching food item: " + response.data.errorMessage
            );
          }
        } catch (error) {
          setFetchError("Error fetching food item: " + error.message);
        }
      };
      fetchFoodItem();
    }
  }, [id]);

  const addTocart = async (id) => {
    const cart = {
      FoodItemId: id,
      Count: 1,
    };
    console.log(cart);
    console.log(authData.token);

    try {
      const response = await axios.post(`${BaseUrl}ShoppingCart`, cart, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
      });
      console.log(response.data);
      if (response.data.isSuccess === true) {
        Alert.alert("Success", "Food added to cart.");
      } else {
        Alert.alert("Error", "Something went wrong. Try Again!!!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <View className="flex-1 absolute w-full h-full">
      <View>
        <Image
          source={require("../../assets/images/4.jpg")}
          className="rounded-b-3xl"
          style={{ height: 240, width: "100%" }}
        />
      </View>

      {fetchError ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red" }}>{fetchError}</Text>
        </View>
      ) : (
        <FlatList
          className=""
          data={foodItem}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderAllFoodItem item={item} addTocart={addTocart} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cart");
        }}
        style={{
          bottom: 0,
          right: 0,
          position: "fixed",
          marginLeft: 10,
          width: "10%",
        }}
        className="bg-blue-200 rounded-full items-center p-2"
      >
        <ShoppingCartIcon size={30} color={"green"} />
      </TouchableOpacity>
    </View>
  );
};

const RenderAllFoodItem = ({ item, index, addTocart }) => {
  return (
    <View className="flex-row items-center bg-blue-200 rounded-3xl w-11/12 mx-auto">
      <View className="mr-4">
        <Image
          className="rounded-3xl"
          source={{ uri: item.imageUrl }} // Assuming you have an 'image' property in the seller profile
          style={{ height: 120, width: 130 }}
        />
      </View>
      <View className="gap-y-2">
        <View>
          <Text className="text-xl font-bold">{item.foodName}</Text>
        </View>
        <View className="flex-row justify-between w-56 items-center ">
          <View>
            <Text>Rs. {item.foodPrice}</Text>
          </View>
          <View>
            <TouchableOpacity
              className="p-2 bg-red-300 rounded-xl"
              onPress={() => {
                addTocart(item.id);
              }}
            >
              <Text>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductDetails;
