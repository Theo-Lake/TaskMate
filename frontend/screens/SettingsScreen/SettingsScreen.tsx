import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme } from "react-native-paper";
import {styles} from "../MyTasksScreen/styles"
import CustomHeader from "../../components/navBar/CustomHeader";

export default function SettingsScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Settings" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
        </View>

    );
  }

