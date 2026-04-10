import React, { useState } from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, TextInput, Button } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import Logo from '../../../assets/img/logoNoText.png';

//logic imports
import { useCreateUser } from "../../hooks/useUsers";
import { validate } from "../../validation/validate";
import { SignUpSchema, UserSchema } from "../../validation/schemas/users";

export default function SignUpScreen({ navigation }: any) {

    const [firstNameText, setFirstNameText] = React.useState("");
    const [lastNameText, setLastNameText] = React.useState("");
    const [emailText, setEmailText] = React.useState("");
    const [passText, setPassText] = React.useState("");

    //csaves validation errors
    const [errors, setErrors] = useState<any>({});
    const {mutate:createUser, isPending} = useCreateUser();

    //sign up logic
    const handleSignUp = () => {
        const formData = { //forming data to send
            firstName: firstNameText,
            lastName: lastNameText,
            email: emailText,
            password: passText,
        };
        const result = validate(SignUpSchema, formData);
        if(!result.success){
            setErrors(result.errors.fieldErrors);
            return;
        }
        setErrors({});
        createUser(result.data,{
            onSuccess:() => {
                navigation.navigate('OpeningTabs', {screen: 'EmailConformation'});
            },
            onError:(error)=>{
                console.error("Error:", error);
            }
        })
    };

    return (

        <View style={styles.container}>
            <CustomHeader title="Sign Up" navigation={navigation}/>

            <View style={styles.content}>
                <View style={styles.img}>
                    <Image source={Logo} style={{width:200, resizeMode:"contain"}}></Image>
                </View>
                
                <View style={styles.namesView}>
                    <TextInput mode='outlined' label="First Name" value={firstNameText} onChangeText={text => setFirstNameText(text)} style={styles.nameBox} error={!!errors.firstName}/>
                    <TextInput mode='outlined' label="Last Name" value={lastNameText} onChangeText={text => setLastNameText(text)} style={styles.nameBox} error={!!errors.lastName}/>
                </View>

                <View style={{padding:20}}>
                    <TextInput mode='outlined' label="Email" value={emailText} onChangeText={text => setEmailText(text)} style={styles.textBox} error={!!errors.email}/>
                    <TextInput mode='outlined' label="Password" value={passText} onChangeText={text => setPassText(text)} secureTextEntry style={styles.textBox} error={!!errors.password}/>
                </View>

                <View style={{marginHorizontal:100}}>
                    <Button icon="account-outline" mode="contained" onPress={handleSignUp} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Sign Up</Button>
                </View>
            </View>
            
        </View>
    );
  }

