import React, {useEffect, useState} from "react";
import { View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, IconButton, Switch } from "react-native-paper";

//#TODO FIX SAVE CHANGES BUTTON. Optional - add delete user button
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import {styles} from "./styles"
import { useAccessibility } from "../../context/AccessibilityContext";



export default function AccessibilityScreen({navigation}:any) {
    const {isLargeText, toggleLargeText, fontMultiplier} = useAccessibility();
    const helpText1 = `FAQ:

1. Creating a task.

To create a task, go to the task page and click the green plus sign. On the Create Task page, fill in the fields and click Publish Task. After someone offers to help you, you can go to the My Tasks page, click on that task, and accept or decline the offer. You can then chat with the assignee. After completing a task, you can click the "Task Completed" button on that task's page. The funds will then be debited from your account and sent to the helper's account.
`;

    const helpText2 = `2. Changing Your Password.

To change your password, go to your profile page. Click the gear icon and click "Settings." Scroll down and click "Change Password." An email with a confirmation code will then be sent to your email address. Copy the code and paste it into the text field, then enter your password in the second text field. Click "Change Password." The password has now been changed.`;
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Accessibility" navigation={navigation} showBackArrow={true} showProfilePicture={false} />

            <ScrollView  showsHorizontalScrollIndicator={false}  stickyHeaderIndices={[1]} style={{marginLeft:20, marginRight:20}}>
                <View style={styles.editingSection}>
                    <View style={{padding:20}}>
                        <Text style={{fontSize: 16 * fontMultiplier}}>Large accessibility text</Text>
                        <Switch
                            value={isLargeText}
                            onValueChange={toggleLargeText}/>
                    </View>

                    <View style={{marginTop:'auto', marginBottom:30, paddingHorizontal: 20}}>
                        <Text style={{fontSize:20 * fontMultiplier}}>{helpText1}</Text>
                        <Text style={{fontSize:20 * fontMultiplier}}>{helpText2}</Text>
                    </View>
                </View>
            </ScrollView>

        </View>

    );
  }

