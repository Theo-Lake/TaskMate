import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, TextInput, Button } from "react-native-paper";

import Logo from '../assets/img/logoNoText.png';


export default function LoginScreen({ navigation }: any) {

    const [emailText, setEmailText] = React.useState("");
    const [passText, setPassText] = React.useState("");

    return (
        <View style={styles.container}>
            <Appbar.Header elevated={true}  style={{backgroundColor:'#3D8252'}}>
                <Appbar.BackAction color="white" onPress={()=>navigation.navigate('Opening')}/>
                <Appbar.Content title="Log In" color="white"/>
            </Appbar.Header>
            
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffffff'
    },
    content:{
        flex:1,
        justifyContent:'center',
        paddingBottom:50,
    },
    title:{
        marginBottom:20,
        textAlign: "center",
        fontSize:30,
    },

    img: {
        alignItems:'center'
    },

    textBox: {
        marginBottom:10
    }
});