import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme,Appbar, Avatar } from "react-native-paper";
import {styles} from "../TasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";

export default function TasksScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Messages" navigation={navigation} showProfilePicture={true} />
        </View>

    );
  }

