import React, {memo} from "react";
import {Appbar, Avatar} from 'react-native-paper';
import CustomerAvatar from "../avatars/CustomerAvatars";
import { View,TouchableOpacity } from "react-native";
import { useCurrentUser } from "../../hooks/useUsers";
import { useAccessibility } from "../../context/AccessibilityContext";
interface CustomHeaderProps{
    title: string;
    navigation: any;
    showBackArrow?: boolean;
    showProfilePicture?: boolean;
    onBackPress?: () => void;
}

function CustomHeader({title,navigation,showBackArrow=false, onBackPress, showProfilePicture=false}:CustomHeaderProps){

    const {data:userResp, isLoading} = useCurrentUser();
    const currentUSer = userResp?.users?.user

    const {fontMultiplier} = useAccessibility();
    return(
        
        <Appbar.Header elevated={true}  style={{backgroundColor:'#3D8252'}}>
            {showBackArrow ? (
                <Appbar.BackAction
                    color="white"
                    onPress={() => {
                        if (onBackPress){
                            onBackPress();
                        }else{
                            navigation.goBack();
                        }
                    }}
                />
            ) : (
                <View style={{ width: 48 }} />
            )}

        <Appbar.Content title={title} color="white" style={{alignItems: 'center' }} titleStyle={{fontSize:20*fontMultiplier}}/>

        {showProfilePicture ? (
            <TouchableOpacity onPress={() => navigation.navigate('MyTasksTab', { screen: 'UserProfileScreen' })}>
                <CustomerAvatar size={40} user={currentUSer}/>
            </TouchableOpacity>
        ) : (
            <View style={{ width: 48 }} />
        )}
        

        </Appbar.Header>
    )
}
export default memo(CustomHeader);