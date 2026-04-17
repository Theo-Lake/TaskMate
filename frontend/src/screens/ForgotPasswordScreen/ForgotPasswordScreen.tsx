import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Text } from "react-native-paper";
import CustomHeader from "../../components/navBar/CustomHeader";
import {styles} from "./styles";

export default function ForgotPasswordScreen({ navigation }: any) {
    const [email, setEmail] = useState("");

    const handleSendLink = () => {
        //Need Backend Logic to be implemented here so the email is sent
        console.log("Simulating sending email to:", email);
        
        // For testing the UI, this button will jump straight to the next screen
        navigation.navigate('ResetForgottenPasswordScreen');
    }

    return (
        <View style={styles.container}>
            <CustomHeader title="Forgot Password" navigation={navigation} showBackArrow={true} showProfilePicture={false} />
            
            <ScrollView 
                contentContainerStyle={styles.content} 
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.instructions}>
                    Please enter your email below to be sent a link to reset your password.
                </Text>

                <TextInput 
                    mode='outlined' 
                    label="Email" 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textBox} 
                />
                
                <Button 
                    mode="contained" 
                    onPress={handleSendLink} 
                    style={styles.button} 
                    labelStyle={{fontSize:20, lineHeight:25}} 
                    contentStyle={{marginVertical:10}}
                >
                    Send Link
                </Button>
            </ScrollView>
        </View>
    );
}
