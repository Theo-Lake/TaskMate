import React, {memo} from "react";
import {Appbar, Avatar} from 'react-native-paper';
import CustomerAvatar from "../avatars/CustomerAvatars";
import { TouchableOpacity } from "react-native";
import { useProfile } from "../../hooks/useProfile";
interface CustomHeaderProps{
    title: string;
    navigation: any;
    showBackArrow?: boolean;
    showProfilePicture?: boolean;
    onBackPress?: () => void;
}

function CustomHeader({title,navigation,showBackArrow=false, onBackPress, showProfilePicture=false}:CustomHeaderProps){

    const {data:user} = useProfile();
    return(
        
        <Appbar.Header elevated={true}  style={{backgroundColor:'#3D8252'}}>
            {showBackArrow && (
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
            )}


        <Appbar.Content title={title} color="white"/>

        {showProfilePicture && (
            <TouchableOpacity onPress={() => navigation.navigate('MyTasksTab', { screen: 'UserProfileScreen' })}>
                <CustomerAvatar size={40} user={user}/>
            </TouchableOpacity>
            
            
        )}

        </Appbar.Header>
    )
}
export default memo(CustomHeader);