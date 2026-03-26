import React from "react";
import {Appbar, Avatar} from 'react-native-paper';

interface CustomHeaderProps{
    title: string;
    navigation: any;
    showBackArrow?: boolean;
    showProfilePicture?: boolean;
    onBackPress?: () => void;
}

export default function CustomHeader({title,navigation,showBackArrow=false, onBackPress, showProfilePicture=false}:CustomHeaderProps){
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
            <Appbar.Action icon={() => (
                <Avatar.Icon size={30} icon="account" style={{backgroundColor:'#ffffff20'}} color="white"/>
                )}
                color="white"
                onPress={() => navigation.navigate('ProfileTab')}
            />
        )}

        </Appbar.Header>
    )
}