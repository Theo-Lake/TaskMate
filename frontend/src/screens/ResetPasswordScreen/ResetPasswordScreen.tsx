import React,{useState} from "react";
import { View, StyleSheet, Image, Text, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, TextInput, Button } from "react-native-paper";
import {styles} from "./styles"

import CustomHeader from "../../components/navBar/CustomHeader";
import { useAuth } from "../../context/AuthContext";
import { useCurrentUser } from "../../hooks/useUsers";
import { useRequestPasswordReset, useResetPassword } from "../../hooks/useAuth";
import { validate } from "../../validation/validate";
import { resetPassword } from "../../api/auth";

import {z} from 'zod'
import { UserSchema } from "../../validation/schemas/users";
import { EmailVerificcationSchema } from "../../validation/schemas/emailCode";

export default function ResetPasswordScreen({ navigation }: any) {

    //re using validation from two schemas:
    const PasswordResetSchema = z.object({
        token: EmailVerificcationSchema.shape.token,
        newPassword: UserSchema.shape.password,
    })

    const {data: responseData} = useCurrentUser();
    const user = responseData?.users?.user

    const {mutate: requestReset, isPending: isRequesting} = useRequestPasswordReset();
    const {mutate: resetPassword, isPending: isResetting} = useResetPassword();

    //allows to change elements without chenging the page
    const [resState, setResState] = useState<1 |2>(1)

    const [VerifCode, setVerifCode] = React.useState("");
    const [passText, setPassText] = React.useState("");
    const [errors, setErrors] = useState<any>({});
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
    //1st state handler. Requests ressend, sends code:
    const handleSendCode=()=>{
        console.log('USer email:', user?.email)
        setErrorMsg(null);
        
        if (!user?.email){
            setErrorMsg("Email not found. Try to log in again")
            return
        }
        requestReset(user.email,{
            onSuccess:()=> {
                console.log("move to second step!")
                setResState(2);
            },
            onError(error: any) {
                console.log("Server error:", error)
                setErrorMsg(error.response?.data.error)
            },
        })
    };
    const handleSubmitNewPassword=()=>{
        setErrorMsg(null);
        setErrors({});
        
        //validation:
        const validationResult = PasswordResetSchema.safeParse({
            token: VerifCode.trim(),
            newPassword: passText.trim(),
        })
        if (!validationResult.success){
            const formatedErrors = validationResult.error.format();
            const newErrors:{ token?: string; password?: string} ={}
            if (formatedErrors.token?._errors.length){
                newErrors.token=formatedErrors.token._errors[0];
            }
            if(formatedErrors.newPassword?._errors.length){
                newErrors.password=formatedErrors.newPassword._errors[0]
            }
            setErrors(newErrors);
            setErrorMsg(newErrors.password || newErrors.token || "Wrong format for password or code")
            return;
        }
        resetPassword({
            token: validationResult.data.token,
            newPassword: validationResult.data.newPassword
        },{
            onSuccess:()=> {
                Alert.alert("Password updated!", "Your password has been updated!");
                navigation.goBack();
            },
            onError: (error: any)=>{
                setErrorMsg(error.response?.data?.error || "Invalid password")
            }
        })
    }

    return (
        <View style={styles.container}>
            <CustomHeader title="Reset password" navigation={navigation} showBackArrow={true} />
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 :0 }>            
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={styles.content}>
                        {resState ===1 ? (
                            <>
                                <Text style={styles.instuuctionText}> The confirmation code will be sent to your email:</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#3D8252', marginBottom: 30 }}>
                                    {user?.email || "Loading email..."}
                                </Text>
                                <View style={{ height: 24, marginBottom: 10, alignItems: 'center' }}>
                                    {errorMsg && <Text style={{ color: '#d32f2f' }}>{errorMsg}</Text>}
                                </View>
                                <Button icon="email-outline" mode="contained" onPress={handleSendCode} loading={isRequesting} disabled={isRequesting} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}
                                >Send code</Button>
                            </>

                        ):(
                            <>
                                <Text style={styles.instuuctionText}> The confirmation code has been sent to your email.</Text>
                                <TextInput mode='outlined' label="Verification Code" value={VerifCode} onChangeText={text => setVerifCode(text)} style={styles.textBox} error={!!errors.token}/>
                                <TextInput mode='outlined' label="New Password" value={passText} onChangeText={text => setPassText(text)} secureTextEntry style={styles.textBox} error={!!errors.password}/>
                                <View style={{ height: 24, marginBottom: 10, alignItems: 'center' }}>
                                    {errorMsg && <Text style={{ color: '#d32f2f' }}>{errorMsg}</Text>}
                                </View>
                                <Button icon="lock-reset" mode="contained" onPress={handleSubmitNewPassword} loading={isResetting} disabled={isResetting} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}
                                >Update</Button>
                                <Button mode="text" onPress={() => {setResState(1); setErrorMsg(null);}} style={{marginTop:20}} textColor='gray'> Didn't get the code?</Button>
                            </>
                        )}

                    
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            
        </View>
    );
}

