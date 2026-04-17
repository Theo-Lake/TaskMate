import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from "react-native-paper";
import CustomHeader from "../../components/navBar/CustomHeader";
import {styles} from "./styles";

export default function ResetForgottenPasswordScreen({ navigation }: any) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        console.log("Backend stores the new password:", newPassword);
        
        // Once the password resets successfully, send them back to the Login screen
        navigation.navigate('Login'); 
    }

    return (
        <View style={styles.container}>
            <CustomHeader title="Create New Password" navigation={navigation} showBackArrow={true} showProfilePicture={false} />
            
            <ScrollView 
                contentContainerStyle={styles.content} 
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.instructions}>
                    Enter your new password below.
                </Text>

                <TextInput 
                    mode='outlined' 
                    label="New Password" 
                    value={newPassword} 
                    onChangeText={text => setNewPassword(text)} 
                    secureTextEntry={true} 
                    style={styles.textBox} 
                />

                <TextInput 
                    mode='outlined' 
                    label="Confirm your new password" 
                    value={confirmPassword} 
                    onChangeText={text => setConfirmPassword(text)} 
                    secureTextEntry={true} 
                    style={styles.textBox} 
                />
                
                <Button 
                    icon="lock-reset"
                    mode="contained" 
                    onPress={handleReset} 
                    style={styles.button} 
                    labelStyle={{fontSize:20, lineHeight:25}} 
                    contentStyle={{marginVertical:10}}
                >
                    Reset Password
                </Button>
            </ScrollView>
        </View>
    );
}

