import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme, Button } from "react-native-paper";
import {styles} from "./styles"


export default function OpeningScreen({navigation} : any){
    const theme = useTheme();
    return(
        <View style={styles.container}>
            <Image source={require('../../../assets/img/logoNoText.png')} style ={styles.logo} resizeMode="contain"/>
            <Text variant="displaySmall" style={[styles.title,{color: theme.colors.softBlack}]}> {/* This is how u put custom colors. U can put MD3 colors in Styleshet*/}
                Welcome to TaskMate!
            </Text>
            <View style={{flexDirection:'row',gap:5}}>
                <Button icon="check" mode="contained" onPress={() => navigation.navigate('OpeningTabs', { screen: 'Login' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Log In</Button>
                <Button icon="message-text-outline" mode="contained" onPress={() => navigation.navigate('OpeningTabs', { screen: 'SignUp' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Sign Up</Button>
            </View>
        </View>
    );
}

