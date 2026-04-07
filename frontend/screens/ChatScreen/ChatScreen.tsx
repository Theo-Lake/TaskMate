import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, IconButton } from "react-native-paper";
import {styles} from "../ChatsScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";

const messages = [
    {
        id: "1",
        text: "hello",
        mine: false,
    },
    {
        id: "2",
        text: "hallo",
        mine: true,
    },
    {
        id: "3",
        text: "hello",
        mine: false,
    },
    {
        id: "4",
        text: "hallo",
        mine: true,
    },
    {
        id: "5",
        text: "hello",
        mine: false,
    },
    {
        id: "6",
        text: "hallo",
        mine: true,
    },
    {
        id: "7",
        text: "hello",
        mine: false,
    },
    {
        id: "8",
        text: "hallo",
        mine: true,
    },
    {
        id: "9",
        text: "hello",
        mine: false,
    },
    {
        id: "10",
        text: "hullo",
        mine: true,
    },
    {
        id: "11",
        text: "hello",
        mine: false,
    },
    {
        id: "12",
        text: "hullo",
        mine: true,
    },
    {
        id: "13",
        text: "hello",
        mine: false,
    },
    {
        id: "14",
        text: "hullo",
        mine: true,
    },
];

export default function ChatScreen({navigation, route}:any) {
    const { name } = route.params || {};
    const [message, setMessage] = useState("");

    return (
        <>
        <View>
            <CustomHeader title={name} navigation={navigation} showBackArrow={true} showProfilePicture={true}/>
        </View>

        <KeyboardAvoidingView style={{flex:1}} behavior={"padding"}>
                <View style={{flex:1}}>
                    <FlatList
                        data={messages}
                        inverted
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 8 }}
                        renderItem={({item}) => (
                            <View
                            style={{
                                alignSelf: item.mine ? "flex-end" : "flex-start",
                                backgroundColor: item.mine ? "#3D8252" : "#EAEAEA",
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                borderRadius: 16,
                                marginBottom: 8,
                                maxWidth: "80%",
                            }}>
                                <Text style={{ color: item.mine ? "white" : "black" }}>{item.text}</Text>
                            </View>
                        )}
                    />

                    <View style={{flexDirection:"row", alignItems: "center", padding:8, borderTopWidth:1, borderTopColor:"#cccccc"}}>
                        <TextInput 
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Type here"
                            style={{
                                flex:1,
                                backgroundColor: "white",
                                borderRadius:20,
                                padding:14
                            }}
                        />
                        <IconButton
                            style={{backgroundColor: "#3D8252"}}
                            mode="contained"
                            icon="send"
                            iconColor="white"
                            onPress={() => {
                                console.log("sent message", message);
                                setMessage("");
                            }}
                        />
                    </View>
                </View>
        </KeyboardAvoidingView>
        </>

    );
  }
