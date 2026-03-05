import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme } from "react-native-paper";

export default function OpeningScreen() {
    return (
        <Text variant="displaySmall" style={styles.title}> {/* This is how u put custom colors. U can put MD3 colors in Styleshet*/}
        Placeholder...
        </Text>
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
    }
});