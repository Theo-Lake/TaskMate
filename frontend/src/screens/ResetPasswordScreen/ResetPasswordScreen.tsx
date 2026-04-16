import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from "react-native-paper";
import CustomHeader from "../../components/navBar/CustomHeader";

export default function ResetPasswordScreen({ navigation }: any) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        
        console.log("Ready to change password!");
        navigation.goBack(); 
    }

    return (
        <View style={styles.container}>
            <CustomHeader title="Change Password" navigation={navigation} showBackArrow={true} showProfilePicture={false}/>
            
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.content}>
                    <Text style={styles.instructions}>
                        Please enter your current password and the new password you'd like to set below.
                    </Text>

                    <TextInput 
                        mode='outlined' 
                        label="Old Password" 
                        value={oldPassword} 
                        onChangeText={text => setOldPassword(text)} 
                        secureTextEntry={true} 
                        style={styles.textBox} 
                    />
                    
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
                        label="Confirm New Password" 
                        value={confirmPassword} 
                        onChangeText={text => setConfirmPassword(text)} 
                        secureTextEntry={true} 
                        style={styles.textBox} 
                    />
                    
                    <Button 
                        icon="lock-check" 
                        mode="contained" 
                        onPress={handlePasswordChange} 
                        style={styles.button} 
                        labelStyle={{fontSize:20, lineHeight:25}} 
                        contentStyle={{marginVertical:10}}
                    >
                        Change Password
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    content: {
        padding: 20,
        paddingTop: 30, 
    },
    instructions: {
        marginBottom: 20,
        fontSize: 16,
        color: '#555'
    },
    textBox: {
        marginBottom: 20 
    },
    button: {
        borderRadius: 40, 
        backgroundColor: '#3D8252',
        marginHorizontal: 40,
        marginTop: 20
    }
});