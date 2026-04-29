import React from "react";
import { Avatar, useTheme } from "react-native-paper";
//TODO SOLVED: deal with user object
export default function CustomerAvatar({user, size=40}: {
    user: {
        profilePicture: string;
    };
    size?: number
}){

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
            style={{backgroundColor:'#64A376'}}
            color={theme.colors.onPrimaryContainer}/>
    )
}