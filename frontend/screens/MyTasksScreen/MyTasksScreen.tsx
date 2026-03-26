import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme,Appbar, Avatar } from "react-native-paper";
import {styles} from "../MyTasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";

export default function MyTasksScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="My Tasks" navigation={navigation} showProfilePicture={true}/>
        </View>

    );
  }

