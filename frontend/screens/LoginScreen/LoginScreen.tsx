import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, TextInput, Button } from "react-native-paper";
import {styles} from "./styles"

import Logo from '../../assets/img/logoNoText.png';
import CustomHeader from "../../components/navBar/CustomHeader";

export default function LoginScreen({ navigation }: any) {

    const [emailText, setEmailText] = React.useState("");
    const [passText, setPassText] = React.useState("");

    return (
        <View style={styles.container}>
            <CustomHeader title="Log In" navigation={navigation}/>
            
            <View style={styles.content}>
                <View style={styles.img}>
                    <Image source={Logo} style={{width:200, resizeMode:"contain"}}></Image>
                </View>

                <View style={{padding:20}}>
                    <TextInput mode='outlined' label="Email" value={emailText} onChangeText={text => setEmailText(text)} style={styles.textBox} />
                    <TextInput mode='outlined' label="Password" value={passText} onChangeText={text => setPassText(text)} secureTextEntry style={styles.textBox} />
                </View>

                <View style={{marginHorizontal:100}}>
                    <Button icon="account-outline" mode="contained" onPress={() => navigation.navigate('Home')} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Log In</Button>
                </View>
            </View>
            
        </View>
    );
}

