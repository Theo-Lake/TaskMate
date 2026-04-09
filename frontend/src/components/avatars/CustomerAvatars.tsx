import React from "react";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
//TODO: deal with user object
export default function CustomerAvatar({user, size=40}){
    const theme = useTheme();

    if (user?.photoUrl){
        return(
            <Avatar.Image
                size={size}
                source={{uri: user.photoUrl}}/>
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