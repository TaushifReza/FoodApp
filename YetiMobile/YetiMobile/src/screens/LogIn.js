import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";
import { BaseUrl } from "../../Database/BaseUrl";
import { AuthContext } from "../context/AuthContext";

const LogIn = () => {
  const navigation = useNavigation();
  const { setAuthInfo } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    let loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post(`${BaseUrl}User/login`, loginData);

      if (response.data.isSuccess === true) {
        const response_data = {
          token: response.data.token,
          role: response.data.role,
          email: response.data.user.email,
          fullName: response.data.user.fullName,
          phoneNumber: response.data.user.phoneNumber,
          address: response.data.user.address,
        };

        // Save the response_data to the AuthContext
        setAuthInfo(response_data);
        setEmail("");
        setPassword("");
        setIsLoading(false); // Set the loading state to false

        if (response.data.role === "Customer") {
          navigation.navigate("HomeScreen");
        } else if (response.data.role === "Delivery Rider") {
          navigation.navigate("DeliveryHome");
        } else {
          Alert.alert(
            "Error",
            "You are not eligible to login. Try in website."
          );
        }
      } else {
        setIsLoading(false); // Set the loading state to false
        Alert.alert("Error", "Invalid email and password!!!");
      }
    } catch (error) {
      setIsLoading(false); // Set the loading state to false
      console.error("Login error:", error.response.data);
      Alert.alert("Error", "Something happend try again!!!");
    }
  };

  return (
    //This is the main view of this screen
    <View className="flex-1 bg-yellow-400 flex-col justify-end">
      {/* This View is for the Forget Password and skip button */}
      <View className="justify-end flex-row mb-10 mr-5">
        {/*This is For Forget password Button*/}
        <TouchableOpacity>
          <Text className="text-white font-semibold">
            Forget Your Password ?
          </Text>
        </TouchableOpacity>
      </View>

      {/* This View is for the main body section of this screen */}
      <View className="bg-white h-[85%] rounded-[45px] rounded-b-none">
        {/*Header Greeting the user on top of this view*/}
        <View className="flex-row justify-between">
          <Text
            className="font-extrabold text-2xl"
            style={{ marginLeft: 25, marginTop: 20 }}
          >
            Let's get something
          </Text>
        </View>
        <Text className="font-thin" style={{ marginLeft: 25, marginTop: 1 }}>
          Welcome Back ! Login to continue
        </Text>

        {/*Main Image on the center of Screen*/}
        <Image
          source={require("../../assets/images/login.png")}
          className="w-[75%] h-[35%] ml-12 mt-6"
        />

        {/*This View is the text input field for username*/}
        <View
          className="bg-gray-100 h-14 rounded-3xl flex-row items-center"
          style={{ width: "85%", marginHorizontal: 30, marginTop: 8 }}
        >
          <UserIcon
            strokeWidth={2}
            size={30}
            color={"black"}
            style={{ marginLeft: 7 }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Your Email"
            style={{ width: "85%", marginLeft: 3, height: 30 }}
          />
        </View>

        {/*This View is the text input field for Password*/}
        <View
          className="bg-gray-100 h-14 rounded-3xl flex-row items-center"
          style={{ width: "85%", marginHorizontal: 30, marginTop: 20 }}
        >
          <LockClosedIcon
            strokeWidth={2}
            size={30}
            color={"black"}
            style={{ marginLeft: 7 }}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Your Password"
            style={{ width: "85%", marginLeft: 3, height: 30 }}
          />
        </View>

        {/*This View is for the button to Login to system*/}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading} // Disable the button when loading
          className="rounded-2xl bg-yellow-400 items-center justify-center w-60 mx-20 mt-[10%] h-16"
        >
          {isLoading ? (
            <ActivityIndicator color="white" /> // Display a loader
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>

        {/* This View is for Login Button below the screen*/}
        <View className="mt-8 items-center flex-row justify-center">
          <Text>Do Not Have an Account ?</Text>

          {/*Login Button on the screen*/}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text className="ml-1 text-blue-400">SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogIn;
