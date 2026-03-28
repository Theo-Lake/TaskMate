import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme, FAB } from "react-native-paper";
import {styles} from "../TasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";

export default function TasksScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Tasks" navigation={navigation} showProfilePicture={true} />
            <FAB 
                icon="plus"
                style={styles.fab}
                color="#3D8252"
                onPress={() => navigation.navigate('MainApp', {
                    screen: 'MyTasksTab',
                    params: {screen:'CreateTask'}
                })}
            />
        </View>


    );
  }

