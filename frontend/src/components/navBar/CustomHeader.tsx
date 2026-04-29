import React, {memo} from "react";
import {Appbar, Avatar} from 'react-native-paper';
import CustomerAvatar from "../avatars/CustomerAvatars";
import { TouchableOpacity } from "react-native";
import { useCurrentUser } from "../../hooks/useUsers";
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

        <Appbar.Content title={title} color="white" style={{alignItems: showProfilePicture ? 'flex-start' : 'center' }}/>

        {showProfilePicture && (
            <TouchableOpacity onPress={() => navigation.navigate('MyTasksTab', { screen: 'UserProfileScreen' })}>
                <CustomerAvatar size={40} user={currentUSer}/>
            </TouchableOpacity>
        )}
        

        </Appbar.Header>
    )
}
export default memo(CustomHeader);