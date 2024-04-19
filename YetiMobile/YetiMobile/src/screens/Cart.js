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
import { useStripe } from "@stripe/stripe-react-native";

const Cart = (item) => {
  const navigation = useNavigation();
  const { authData } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

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
    try {
      const response = await axios.post(
        `${BaseUrl}Order/PlaceOrder`,
        // Data object
        {},
        // Config object with headers
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(authData.token);
      console.log(error);
    }
  };

  const onCheckOut = async () => {
    // 1. Create Payment Intent
    const response = await PlaceOrder();
    console.log(response);
    const orderHeaderId = response.result.orderHeaderId;
    console.log(orderHeaderId);
    // Check if the request was successful
    if (response.isSuccess == false) {
      Alert.alert("Something went wrong!!!");
      return;
    }
    // 2. Initilizethe Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "YetaiFood.dev",
      paymentIntentClientSecret: response.result.paymentIntentId,
      defaultBillingDetails: {
        name: authData.fullName,
        address: authData.address,
      },
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Something went wrong!!!");
      return;
    }
    // 3. Present Payment Sheet from Strip
    await presentPaymentSheet();
    // 4. If Payment ok -> clear the cart
    const clearCartResponse = await OrderConfirmation(orderHeaderId);
    if (clearCartResponse.isSuccess) {
      Alert.alert("success", "Order has been Placed");
      setCart([]);
    } else {
      Alert.alert("error", "Something went wrong");
    }
  };

  const cancelOrder = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}Order/CancelOrder`,
        // Data object
        {},
        // Config object with headers
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(authData.token);
      console.log(error);
    }
  };

  const OrderConfirmation = async (orderHeaderId) => {
    try {
      const response = await axios.get(
        `${BaseUrl}Order/OrderConfirmation?id=${orderHeaderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(authData.token);
      console.log(error);
    }
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
      {/* cart */}
      {cart.length > 0 && (
        <View className="flex-row w-11/12 mx-auto mt-5 ">
          <TouchableOpacity
            className="rounded-l-2xl bg-green-400 items-center justify-center  mx-auto  h-16"
            style={{ width: "45%" }}
            onPress={onCheckOut}
          >
            <Text className="font-semibold text-white text-2xl">
              Place Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-r-2xl bg-red-400 items-center justify-center  mx-auto  h-16"
            style={{ width: "45%" }}
            onPress={async () => {
              const response = await cancelOrder();
              console.log(response);
              if (response.isSuccess) {
                Alert.alert("success", "Order has been Cancel");
                setCart([]);
              } else {
                Alert.alert("error", "Something went wrong");
              }
            }}
          >
            <Text className="font-semibold text-white text-2xl">
              Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {cart.length === 0 && (
        <View>
          <Text className="text-xl font-bold mb-5 ml-5">No item in cart.</Text>
        </View>
      )}
      <View className="w-full mt-5">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          className=" mx-auto bg-yellow-400 w-7/12 items-center py-4 rounded-2xl "
        >
          <Text className="text-xl font-bold tracking-widest">Home</Text>
        </TouchableOpacity>
      </View>
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
