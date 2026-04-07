import React from "react";
import { View, StyleSheet, Image, FlatList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar } from "react-native-paper";
import {styles} from "../ChatsScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import ChatCard from "../../components/cards/ChatCard";

const chats = [
    {
        id: "1",
        name: "John",
        message: "hello",
    },
    {
        id: "2",
        name: "Jane",
        message: "olleh",
    },
];

export default function ChatsScreen({navigation}:any) {
    return (
        <>
        <View>
            <CustomHeader title="Messages" navigation={navigation} showProfilePicture={true}/>
        </View>

        <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <ChatCard
                    name={item.name}
                    message={item.message}
                    onPress={() => navigation.navigate("ChatScreen", {chatId: item.id, name: item.name})}
                />
            )}
        />
        </>
    );
  }
