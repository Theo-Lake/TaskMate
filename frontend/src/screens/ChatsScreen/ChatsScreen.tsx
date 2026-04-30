import React, { useMemo } from "react";
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Text, useTheme,Appbar, Avatar, ActivityIndicator } from "react-native-paper";
import {styles} from "../ChatsScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import ChatCard from "../../components/cards/ChatCard";
import { useIsFocused } from "@react-navigation/native";

import { useAllConversations } from "../../hooks/useConversations";
import { useCurrentUser, useAllUsers } from "../../hooks/useUsers";

type DisplayChat = {
    id: string;
    name: string;
    message: string;
    taskName?: string;
    role?: "Publisher" | "Assignee";
    rawConversation: any;
}

export default function ChatsScreen({navigation}:any) {
    const isFocused = useIsFocused();
    const { data, isLoading, isError } = useAllConversations(isFocused);
    const { data: currentUserResponse } = useCurrentUser();
    const { data: usersResponse } = useAllUsers();

    const currentUser = currentUserResponse?.users?.user;
    const allUsers = Array.isArray(usersResponse?.users) ? usersResponse.users : Array.isArray(usersResponse) ? usersResponse : [];

    const fetchedConversations = Array.isArray(data?.conversations) ? data.conversations : Array.isArray(data) ? data : [];

    const myConversations = fetchedConversations.filter((conversation: any) => {
        return(
            Number(conversation.user1ID) === Number(currentUser?.userID) || 
            Number(conversation.user2ID) === Number(currentUser?.userID)
        );
    });

    const chats = useMemo<DisplayChat[]>(() => {
        return myConversations.map((conversation: any) => {
            const otherUserId = Number(conversation.user1ID) === Number(currentUser?.userID) ? conversation.user2ID : conversation.user1ID;
            const otherUser = allUsers.find((u: any) => Number(u.userID) === Number(otherUserId));

            const isPublisher = Number(conversation.task?.publisherID) === Number(currentUser?.userID);

            return {
                id: String(conversation.conversationID ?? conversation.id),
                name: otherUser?.username ?? "Unknown user",
                message: conversation.lastMessage?.content ?? conversation.lastMessage?.text,
                taskName: conversation.task?.name,
                role: conversation.task ? (isPublisher ? "Assignee" : "Publisher") : undefined,
                rawConversation: conversation,
            };
        });
    }, [myConversations, currentUser, allUsers]);

    if (isLoading) {
        return (
            <>
            <View>
                <CustomHeader title="Messages" navigation={navigation} showProfilePicture={true} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 20 }}>Loading chats...</Text>
            </View>
            </>
        );
    }

    if (isError) {
        return (
            <>
            <View>
                <CustomHeader title="Messages" navigation={navigation} showProfilePicture={true} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 20 }}>Something went wrong loading the chats!</Text>
            </View>
            </>
        );
    }

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
                    taskName={item.taskName}
                    role={item.role}
                    onPress={() => navigation.navigate("ChatScreen", {convoId: Number(item.id), name: item.name, conversation: item.rawConversation})}
                />
            )}
        />
        </>
    );
  }
