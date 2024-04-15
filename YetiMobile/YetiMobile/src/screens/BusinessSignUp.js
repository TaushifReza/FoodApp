import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import {
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BaseUrl } from "../../Database/BaseUrl";

const BusinessSignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSignUp = async () => {
    const signUpType = {
      fullName,
      email,
      password,
      confirmPassword: password,
      address,
      phoneNumber,
      role: "Restaurants Seller",
    };

    try {
      const response = await axios.post(`${BaseUrl}User/register`, signUpType);
      if (response.data.flag === true) {
        console.log("Signup successful:", response.data);
        Alert.alert(
          "Success",
          `Account created successfully. Check Your Email.`
        );
      } else {
        console.log("Signup Failed:", response.data);
        Alert.alert(
          "Error",
          `Failed to create account: ${response.data.message}`
        );
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error("Signup error1:", error.response.data);
        Alert.alert(
          "Error",
          `Failed to create account: ${error.response.data}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.log(signUpType);
        console.error("Signup error2:", error.request);
        Alert.alert(
          "Error",
          "Failed to create account. Please check your network connection."
        );
      } else {
        // Something else happened in making the request that triggered an error
        console.error("Signup error3:", error.message);
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    //This is the main view of this screen
    <View className="flex-1 flex-col">
      {/*This is the View That contains Header*/}
      <View>
        <Text className="mt-20 ml-6 font-extrabold text-yellow-400 text-3xl">
          YetaiEats
        </Text>
        <Text className="ml-6 mt-3 font-thin text-lg">
          Join YetaiEats Now! Restaurants Seller
        </Text>

        {/*This is the View That contains Forms for signup*/}
        <View className="h-[85%] bg-yellow-400 rounded-[50px] rounded-b-none">
          {/* This Is the View for UserName form*/}
          <View className="bg-white w-[80%] h-12 rounded-[20px] mt-16 ml-10 flex-row items-center ">
            <UserIcon
              strokeWidth={2}
              size={30}
              color={"black"}
              style={{ marginLeft: 7 }}
            />
            <TextInput
              className="pl-1 w-[83%] h-7"
              placeholder="Enter Your Full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* This Is the View for Gmail form*/}
          <View className="bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center">
            <EnvelopeIcon
              strokeWidth={2}
              size={30}
              color={"black"}
              style={{ marginLeft: 7 }}
            />
            <TextInput
              className="pl-1 w-[83%] h-7"
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* This Is the View for Location form*/}
          <View className="bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center ">
            <LockClosedIcon
              strokeWidth={2}
              size={30}
              color={"black"}
              style={{ marginLeft: 7 }}
            />
            <TextInput
              className="pl-1 w-[83%] h-7"
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* This Is the View for Phone Number form*/}
          <View className="bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center">
            <PhoneIcon
              strokeWidth={2}
              size={30}
              color={"black"}
              style={{ marginLeft: 7 }}
            />
            <TextInput
              className="pl-1 w-[83%] h-7"
              placeholder="Enter Your PhoneNumber"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* This Is the View for address*/}
          <View className="bg-white w-[80%] h-12 rounded-[20px] mt-8 ml-10 flex-row items-center">
            <MapPinIcon
              strokeWidth={2}
              size={30}
              color={"black"}
              style={{ marginLeft: 7 }}
            />
            <TextInput
              className="pl-1 w-[83%] h-7"
              placeholder="Enter Your Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-white mt-24 w-60 mx-20 h-12 rounded-2xl flex justify-center items-center"
          >
            <Text className="text-yellow-400 font-bold text-xl">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BusinessSignUp;
