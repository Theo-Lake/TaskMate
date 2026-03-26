import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme } from "react-native-paper";
import {styles} from "../ViewEventScreen/styles"
import CustomHeader from "../../components/navBar/CustomHeader";

export default function ViewOwnTaskScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
        </View>

    );
  }

