import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
    const [usernameText, setUsernameText] = React.useState("");
    const [universityIDText, setUniversityIDText] = React.useState("");
    const [occupationText, setOccupationText] = React.useState("");

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
            username: usernameText,
            universityID: Number(universityIDText),
            occupation: occupationText,
        };
        const result = validate(SignUpSchema, formData);
        if(!result.success){
            setErrors(result.errors.fieldErrors);
            return;
        }
        setErrors({});
        createUser(result.data,{
            onSuccess:(data:any) => {
                navigation.navigate('EmailConfirmation',{userID:data.userID});
            },
            onError:(error)=>{
                console.error("Error:", error);
            }
        })
    };

    return (

        <View style={styles.container}>
            <CustomHeader title="Sign Up" navigation={navigation} showBackArrow={true}/>

            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 :0 }>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.img}>
                            <Image source={Logo} style={{width:200, resizeMode:"contain"}}></Image>
                        </View>
                        
                        <View style={styles.namesView}>
                            <TextInput mode='outlined' label="First Name" value={firstNameText} onChangeText={text => setFirstNameText(text)} style={styles.nameBox} error={!!errors.firstName}/>
                            <TextInput mode='outlined' label="Last Name" value={lastNameText} onChangeText={text => setLastNameText(text)} style={styles.nameBox} error={!!errors.lastName}/>
                        </View>

                        <View style={{padding:20}}>
                            <TextInput mode='outlined' label="Username" value={usernameText} onChangeText={text => setUsernameText(text)} style={styles.textBox} error={!!errors.username}/>
                            <TextInput mode='outlined' label="Email" value={emailText} onChangeText={text => setEmailText(text)} style={styles.textBox} error={!!errors.email}/>
                            <TextInput mode='outlined' label="Password" value={passText} onChangeText={text => setPassText(text)} secureTextEntry style={styles.textBox} error={!!errors.password}/>
                            <TextInput mode='outlined' label="University ID" value={universityIDText} onChangeText={text => setUniversityIDText(text)} keyboardType="numeric" style={styles.textBox} error={!!errors.universityID}/>
                            <TextInput mode='outlined' label="Occupation" value={occupationText} onChangeText={text => setOccupationText(text)} style={styles.textBox} error={!!errors.occupation}/>
                        </View>

                        <View style={{marginHorizontal:100}}>
                            <Button icon="account-outline" mode="contained" onPress={handleSignUp} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Sign Up</Button>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            
        </View>
    );
  }

