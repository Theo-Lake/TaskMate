import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";

export default function CreateEventScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Create Event" navigation={navigation} showBackArrow={true} showProfilePicture={true}/>
        </View>

    );
  }

  