import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { React, useState, useContext, useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { cart } from "../../Database/CartItems";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BaseUrl } from "../../Database/BaseUrl";

const Cart = (item) => {
  const navigation = useNavigation();
  const { authData } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${BaseUrl}ShoppingCart`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        });
        console.log("Response data:", response.data.result);

        if (response.data.isSuccess) {
          setCart(response.data.result);
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
    fetchCart();
  }, []);

  const PlaceOrder = async () => {
    const response = await axios.post(`${BaseUrl}/Order/PlaceOrder`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
    });
    Alert.alert("Error", "You are not eligible to login. Try in website.");
  };

  return (
    <View className=" absolute w-full  mt-10 ">
      <Text className="text-xl font-bold mb-5 ml-5">List of Cart Items</Text>
      {/* cart */}
      <FlatList
        className=""
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderAllProducts item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <Text className="text-xl font-bold ml-5 mt-5">Total Amount: 2100</Text>
      {/* cart */}
      <TouchableOpacity
        className="rounded-2xl bg-yellow-400 items-center justify-center w-11/12 mx-auto mt-10 h-16"
        onPress={PlaceOrder}
      >
        <Text className="font-semibold text-white text-2xl">Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};
const RenderAllProducts = ({ item }) => {
  return (
    <View className="flex-row items-center  bg-blue-200 rounded-3xl w-11/12 mx-auto">
      <View className="gap-x-4 mr-4">
        <Image
          className="rounded-3xl"
          source={{ uri: item.foodItem.imageUrl }} // Assuming you have an 'image' property in the seller profile
          style={{ height: 120, width: 130 }}
        />
      </View>
      <View className="gap-y-2">
        <Text className="text-xl font-bold">{item.foodItem.foodName}</Text>
        <Text>
          {item.count} * {item.foodItem.foodPrice} = {item.price}
        </Text>
      </View>
    </View>
  );
};
export default Cart;
