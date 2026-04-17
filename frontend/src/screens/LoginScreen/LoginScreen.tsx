import React,{useState} from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
import { Appbar, TextInput, Button } from "react-native-paper";
import {styles} from "./styles"

import Logo from '../../../assets/img/logoNoText.png';
import CustomHeader from "../../components/navBar/CustomHeader";
import { useLogin } from "../../hooks/useAuth";

import { validate } from "../../validation/validate";
import { LoginSchema } from "../../validation/schemas/users";
export default function LoginScreen({ navigation }: any) {
    const {mutate: loginMutation, isPending} = useLogin();
    const [emailText, setEmailText] = React.useState("");
    const [passText, setPassText] = React.useState("");

    const [errors, setErrors] = useState<any>({});
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const handleLogin = () => {
        setErrorMsg(null);
        setErrors({});

        const formedData={
            email:emailText.trim(),
            password: passText
        }

        const isValidated = validate(LoginSchema, formedData)
        if (!isValidated.success){
            setErrors(isValidated.errors.fieldErrors);
            return
        }
        loginMutation(
            formedData,
            {
                onSuccess: (data) =>{
                    navigation.replace("MainApp");
                },
                onError: (error) => {
                    const msg = error.response?.data?.error || "Login failed";
                    setErrorMsg(msg);
                }
            }
        )
    }

    return (
        <View style={styles.container}>
            <CustomHeader title="Log In" navigation={navigation} showBackArrow={true}/>
            
            <View style={styles.content}>
                <View style={styles.img}>
                    <Image source={Logo} style={{width:200, resizeMode:"contain"}}></Image>
                </View>

                <View style={{padding:20}}>
                    <TextInput mode='outlined' label="Email" value={emailText} onChangeText={text => setEmailText(text)} style={styles.textBox} error={!!errors.email}/>
                    <TextInput mode='outlined' label="Password" value={passText} onChangeText={text => setPassText(text)} secureTextEntry style={styles.textBox} error={!!errors.password}/>
                </View>
                <View style={{ height: 24, marginBottom: 10, alignItems: 'center' }}>
                    {errorMsg && 
                        <Text style={{ color: '#d32f2f' }}>
                            {errorMsg}
                        </Text>
                    }
                </View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Button 
                        mode="text" 
                        onPress={() => navigation.navigate('ForgotPasswordScreen')}
                        labelStyle={{ color: '#3D8252', fontSize: 16 }}
                    >
                        Forgot Password
                    </Button>
                </View>
                <View style={{marginHorizontal:100}}>
                    <Button icon="account-outline" mode="contained" onPress={handleLogin} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}
                    loading={isPending} disabled={isPending}
                    >Log In</Button>
                </View>
            </View>
            
        </View>
    );
}

