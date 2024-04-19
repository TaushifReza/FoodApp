import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
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

const DeliveryHome = ({ route }) => {
  const { id } = route.params || {};
  const [order, setOrder] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation();

  //   useEffect(() => {
  //     const fetchorder = async () => {
  //       try {
  //         const response = await axios.get(`${BaseUrl}Order/GetPendingOrder`);
  //         console.log("Response data:", response.data);

  //         if (response.data.isSuccess) {
  //           setOrder(response.data.result);
  //           setFetchError(null);
  //         } else {
  //           setFetchError(
  //             "Error fetching food item: " + response.data.errorMessage
  //           );
  //         }
  //       } catch (error) {
  //         setFetchError("Error fetching food item: " + error.message);
  //       }
  //     };
  //     fetchorder();
  //   }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${BaseUrl}Order/GetPendingOrder`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      console.log("Response data:", response.data);

      if (response.data.isSuccess) {
        setOrder(response.data.result);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchOrder();
    });

    return unsubscribe;
  }, [navigation]);

  const addTocart = async (id) => {
    const cart = {
      orderId: id,
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

  const handleDeliveryPress = (item) => {
    navigation.navigate("OrderConfirmation", { item, fetchOrder });
  };

  return (
    <View className="flex-1 absolute w-full h-full">
      <View className="w-11/12 mx-auto rounded-xl py-4 px-2 mt-4">
        <Text className="w-full p-3 text-center font-semibold text-xl">
          Pending Orders
        </Text>
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
          data={order}
          keyExtractor={(item) => item.applicationUserId.toString()}
          renderItem={({ item }) => (
            <RenderAllorder
              item={item}
              addTocart={addTocart}
              handleDeliveryPress={handleDeliveryPress}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

const RenderAllorder = ({ item, index, handleDeliveryPress }) => {
  return (
    <View className="flex-row items-center bg-blue-200 rounded-3xl w-11/12 mx-auto">
      <View className="mr-4">
        <Image
          className="rounded-l-3xl"
          source={require("../../assets/images/friedchicken.jpg")} // Assuming you have an 'image' property in the seller profile
          style={{ height: 120, width: 130 }}
        />
      </View>
      <View className="gap-y-2">
        <View>
          <Text className="text-xl font-bold">{item.address}</Text>
        </View>
        <View className="flex-row justify-between w-56 items-center ">
          <View>
            <Text>Rs. {item.orderTotal}</Text>
          </View>
          <View>
            <TouchableOpacity
              className="p-2 bg-green-400 rounded-xl"
              onPress={() => handleDeliveryPress(item)}
            >
              <Text>Delivered</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default DeliveryHome;
