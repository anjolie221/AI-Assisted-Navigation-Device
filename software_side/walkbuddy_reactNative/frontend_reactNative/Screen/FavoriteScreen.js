import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // Load saved favorites
  useEffect(() => {
    const loadFavorites = async () => {
      const data = await AsyncStorage.getItem("favorites");
      if (data) setFavorites(JSON.parse(data));
    };
    loadFavorites();
  }, []);

  // Save favorites
  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    if (!name || !address) return;

    const newFav = {
      id: Date.now().toString(),
      name,
      address,
    };

    setFavorites([...favorites, newFav]);
    setName("");
    setAddress("");
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Favorite Destinations
      </Text>

      <TextInput
        placeholder="Name (e.g. Home)"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <Button title="Add Favorite" onPress={addFavorite} />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 15, padding: 10, borderWidth: 1 }}>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>

            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}