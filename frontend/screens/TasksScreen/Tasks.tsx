import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme,Appbar, Avatar } from "react-native-paper";
import {styles} from "../MyTasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function TasksScreen({navigation}:any) {
    return (
        <>
            <Appbar.Header elevated={true}  style={{backgroundColor:'#3D8252'}}>
            <Appbar.Content title="Tasks" color="white"/>
            <Appbar.Action icon={() => (
                <Avatar.Icon size={34} icon="account" style={{backgroundColor:'#ffffff20'}} color="white"/>
                )}
                color="white"
                onPress={() => navigation.navigate('ProfileTab')}
            />
        </Appbar.Header>

        <Text variant="displaySmall" style={styles.title}> {/* This is how u put custom colors. U can put MD3 colors in Styleshet*/}

        </Text>
        </>

    );
  }

