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
  UserIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  BanknotesIcon,
  MapPinIcon,
  TruckIcon,
} from "react-native-heroicons/outline";
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
import BottomNav from "../../navigation/BottomNav";

const OrderConfirmation = ({ route }) => {
  const navigation = useNavigation();
  const { authData } = useContext(AuthContext);
  const { item, fetchOrder } = route.params;
  const [showPickOrder, setShowPickOrder] = useState(true);
  const [showShippedOrder, setShowShippedOrder] = useState(false);

  const handlePickOrder = () => {
    setShowPickOrder(false);
    setShowShippedOrder(true);
  };

  const placeOrder = async () => {
    try {
      setShowShippedOrder(false);
      const config = {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      };

      const response = await axios.get(
        `${BaseUrl}Order/ShippedOrder?id=${item.id}`,
        config
      );
      console.log("Response data:", response.data);

      if (response.data.isSuccess) {
        Alert.alert("success", `${response.data.result}`);
        await fetchOrder(); // Call the fetchOrder function before navigating
        navigation.navigate("DeliveryHome");
      } else {
        setShowShippedOrder(true);
        Alert.alert("error", "Something went wrong");
      }
    } catch (error) {
      setShowShippedOrder(true);
      console.log(error);
      Alert.alert("error", `${error.response.data.result}`);
    }
  };

  return (
    <View className="flex-1 absolute w-full h-full">
      <View className="w-11/12 mx-auto rounded-xl py-4 px-2 mt-4">
        <Text className="w-full py-3 font-extrabold text-3xl rounded-2xl">
          Track Order
        </Text>
      </View>

      <FlatList
        className=""
        data={[item]}
        keyExtractor={(item) => item.applicationUserId.toString()}
        renderItem={({ item }) => (
          <RenderAllorder
            item={item}
            handlePickOrder={handlePickOrder}
            showPickOrder={showPickOrder}
            showShippedOrder={showShippedOrder}
            placeOrder={placeOrder}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

const RenderAllorder = ({
  item,
  index,
  handlePickOrder,
  showPickOrder,
  showShippedOrder,
  placeOrder,
}) => {
  return (
    <View className="items-center w-11/12 mx-auto">
      <View className="flex-row w-full justify-between">
        <View className="">
          <Text className="text-lg">
            Order Date: {item.orderDate.split("T")[0]}
          </Text>
          <View>
            <Text className="text-lg">Order ID: {item.id}</Text>
          </View>
        </View>
        <View className="">
          <Text className="text-lg font-medium">
            Amount: Rs.{item.orderTotal}
          </Text>
        </View>
      </View>
      <View className="w-full bg-slate-300 p-4 rounded-lg mt-4">
        <View className="flex-row items-center gap-2 my-4">
          <ArrowPathIcon
            strokeWidth={2}
            size={30}
            color={"black"}
            style={{ marginLeft: 7 }}
          />
          <Text className="text-lg">Order Status: {item.orderStatus}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-4">
          <BanknotesIcon
            strokeWidth={2}
            size={30}
            color={"black"}
            style={{ marginLeft: 7 }}
          />
          <Text className="text-lg">Payment Status: {item.paymentStatus}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-4">
          <MapPinIcon
            strokeWidth={2}
            size={30}
            color={"black"}
            style={{ marginLeft: 7 }}
          />
          <Text className="text-lg">Delivery Address: {item.address}</Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center">
        {showPickOrder && (
          <TouchableOpacity
            className="rounded-2xl bg-yellow-400 items-center justify-center w-96 mx-20 mt-[10%] h-16"
            onPress={handlePickOrder}
          >
            <Text className="tracking-widest text-xl font-semibold">
              Pick Order
            </Text>
          </TouchableOpacity>
        )}

        {showShippedOrder && (
          <TouchableOpacity
            className="rounded-2xl bg-yellow-400 items-center justify-center w-96 mx-20 mt-[10%] h-16 flex-row"
            onPress={placeOrder}
          >
            <TruckIcon
              strokeWidth={2}
              size={30}
              color={"black"}
              style={{ marginLeft: 7 }}
            />
            <Text className="tracking-widest text-xl font-semibold ml-2">
              Shipped Order
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default OrderConfirmation;
