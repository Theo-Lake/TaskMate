import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, TextInput, Button } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import Logo from '../../assets/img/logoNoText.png';

export default function SignUpScreen({ navigation }: any) {

    const [firstNameText, setFirstNameText] = React.useState("");
    const [lastNameText, setLastNameText] = React.useState("");
    const [emailText, setEmailText] = React.useState("");
    const [passText, setPassText] = React.useState("");

    return (

        <View style={styles.container}>
            <CustomHeader title="Sign Up" navigation={navigation}/>

            <View style={styles.content}>
                <View style={styles.img}>
                    <Image source={Logo} style={{width:200, resizeMode:"contain"}}></Image>
                </View>
                
                <View style={styles.namesView}>
                    <TextInput mode='outlined' label="First Name" value={firstNameText} onChangeText={text => setFirstNameText(text)} style={styles.nameBox} />
                    <TextInput mode='outlined' label="Last Name" value={lastNameText} onChangeText={text => setLastNameText(text)} style={styles.nameBox} />
                </View>

                <View style={{padding:20}}>
                    <TextInput mode='outlined' label="Email" value={emailText} onChangeText={text => setEmailText(text)} style={styles.textBox} />
                    <TextInput mode='outlined' label="Password" value={passText} onChangeText={text => setPassText(text)} secureTextEntry style={styles.textBox} />
                </View>

                <View style={{marginHorizontal:100}}>
                    <Button icon="account-outline" mode="contained" onPress={() => navigation.navigate('OpeningTabs', { screen: 'EmailConfirmation' })} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Sign Up</Button>
                </View>
            </View>
            
        </View>
    );
  }

