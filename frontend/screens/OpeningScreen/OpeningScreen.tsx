import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme } from "react-native-paper";



export default function OpeningScreen({navigation} : any){
    const theme = useTheme();
    return(
        <View style={styles.container}>
            <Image source={require('../assets/img/logoNoText.png')} style ={styles.logo} resizeMode="contain"/>
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding: 20,
        backgroundColor: '#ffffff'
    },
    title:{
        marginBottom:20,
        textAlign: "center",
        fontSize:30,
    },
    arows:{
        marginBottom:20,
        textAlign: 'center',
        fontWeight: '200'
    },
    logo:{
        width:'70%',
        height:'auto',
        aspectRatio:1,
        marginTop:40,
        marginLeft:40,
        marginRight:40,
        marginBottom:10,
    },
    subTitle:{
        fontSize:30,
        paddingTop:30,
    }
});
