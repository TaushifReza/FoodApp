import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BaseUrl } from "../../Database/BaseUrl";
import axios from "axios";

const RenderAllProducts = ({ item }) => {
  const navigation = useNavigation();

  // Check if the item has a valid id property
  if (!item || !item.id) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
      style={{
        marginLeft: 3,
        marginRight: 3,
        backgroundColor: "#c3c3c3",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Image
            source={require("../../assets/images/5.jpg")}
            style={{ height: 120, width: 130, borderRadius: 10 }}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
          <Text>Address: {item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HouseholdProduct = () => {
  const [sellerProfiles, setSellerProfiles] = useState([]);
  const [filteredSellerProfiles, setFilteredSellerProfiles] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchSellerProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BaseUrl}SellerProfile`);
        console.log("Response data:", response.data);
        if (response.data.isSuccess) {
          setSellerProfiles(response.data.result);
          setFilteredSellerProfiles(response.data.result);
          setFetchError(null);
        } else {
          setFetchError(
            "Error fetching seller profiles: " + response.data.errorMessage
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFetchError("No seller profiles found");
        } else {
          setFetchError("Error fetching seller profiles: " + error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchSellerProfiles();
  }, []);

  const searchSellerProfiles = (text) => {
    setSearchText(text);
    const filteredProfiles = sellerProfiles.filter((profile) =>
      profile.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSellerProfiles(filteredProfiles);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 16 }}>Loading...</Text>
        </View>
      ) : fetchError ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red" }}>{fetchError}</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <TextInput
              placeholder="Search"
              style={{
                width: "90%",
                marginLeft: "5%",
                backgroundColor: "#fcd34d",
                borderRadius: 20,
                paddingLeft: 15,
                height: 40,
                fontSize: 16,
                color: "#333",
              }}
              placeholderTextColor="#555"
              value={searchText}
              onChangeText={searchSellerProfiles}
            />
          </View>
          <FlatList
            data={filteredSellerProfiles}
            renderItem={({ item }) => <RenderAllProducts item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      )}
    </View>
  );
};

export default HouseholdProduct;
