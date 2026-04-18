import React from "react";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
//TODO SOLVED: deal with user object
export default function CustomerAvatar({user, size=40}){
    const theme = useTheme();
    const pic = user?.profilePicture;

    const hasValidPicture = pic && typeof pic === 'string' && pic.trim() !== "" && pic !== 'null';
    if (hasValidPicture){
        return(
            <Avatar.Image
                size={size}
                source={{uri: pic}}/>
        )
    }
    return(
        <Avatar.Icon
            size={size}
            icon="account"
            style={{backgroundColor: theme.colors.primaryContainer}}
            color={theme.colors.onPrimaryContainer}/>
    )
}