import React, { useState, useMemo } from "react";
import { View, StyleSheet, Image, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "../ChatsScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";

import { useConversationMessages, useCreateMessage } from "../../hooks/useConversations";
import { useCurrentUser } from "../../hooks/useUsers";

type DisplayMessage = {
    id: string;
    text: string;
    mine: boolean;
    rawMessage: any;
};

export default function ChatScreen({navigation, route}:any) {
    const { convoId, name } = route.params || {};
    const [message, setMessage] = useState("");

    const { data, isLoading, isError } = useConversationMessages(Number(convoId));
    const { data: currentUserResponse } = useCurrentUser();
    const { mutate: createMessage, isPending } = useCreateMessage(Number(convoId));

    const currentUser = currentUserResponse?.users?.user;

    const fetchedMessages = Array.isArray(data?.message) ? data.messages : Array.isArray(data) ? data : [];

    const messages = useMemo<DisplayMessage[]>(() => {
        return fetchedMessages.map((msg: any) => ({
            id: String(msg.messageID ?? msg.id),
            text: msg.content,
            mine: Number(msg.senderID) === Number(currentUser?.userID),
            rawMessage: msg,
        }));
    }, [fetchedMessages, currentUser]);

    const handleSend = () => {
        if (!message.trim()) return;

        createMessage(
            { content: message.trim() },
            {
                onSuccess: () => {
                    setMessage("");
                },
                onError: (error: any) => {
                    console.error("Error:", error);
                    console.log("Status:", error?.response?.status);
                    console.log("Data:", error?.response?.data);
                    console.log("Url:", error?.config?.url);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <>
            <View>
                <CustomHeader title={name ?? "Chat"} navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 20 }}>Loading messages...</Text>
            </View>
            </>
        );
    }

    if (isError) {
        return (
            <>
            <View>
                <CustomHeader title={name ?? "Chat"} navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 20 }}>Something went wrong loading the chat!</Text>
            </View>
            </>
        );
    }

    return (
        <>
        <View>
            <CustomHeader title={name} navigation={navigation} showBackArrow={true} showProfilePicture={true}/>
        </View>

        <KeyboardAvoidingView style={{flex:1}} behavior={"padding"}>
                <View style={{flex:1}}>
                    <FlatList
                        data={[...messages].reverse()}
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
                            disabled={isPending}
                            onPress={handleSend}
                        />
                    </View>
                </View>
        </KeyboardAvoidingView>
        </>

    );
  }
