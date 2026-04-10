import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme } from "react-native-paper";
import {styles} from "./styles"


export default function OpeningScreen({navigation} : any){
    const theme = useTheme();
    return(
        <View style={styles.container}>
            <Image source={require('../../../assets/img/logoNoText.png')} style ={styles.logo} resizeMode="contain"/>
            <Text variant="displaySmall" style={[styles.title,{color: theme.colors.softBlack}]}> {/* This is how u put custom colors. U can put MD3 colors in Styleshet*/}
                Welcome to TaskMate!
            </Text>
            <Text variant="displaySmall" style={[styles.subTitle,{color: theme.colors.softBlack}]}>
                Swipe right to Log In
            </Text>
            <Text variant="displayLarge" style={styles.arows}>
                {">>>>>>>"}
            </Text>
            <Text variant="displaySmall" style={[styles.subTitle,{color: theme.colors.softBlack}]}>
                Or swipe left to Sign Up
            </Text>
            <Text variant="displayLarge" style={styles.arows}>
                {"<<<<<<<"}
            </Text>
        </View>
    );
}

