import React, {useEffect, useState} from "react";
import { View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
//#TODO FIX SAVE CHANGES BUTTON. Optional - add delete user button
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import {styles} from "./styles"

//logic hooks
import { useCurrentUser, useUpdateUser } from "../../hooks/useUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

export default function CardDetailsScreen({navigation}:any) {
    const { data: respdata, isLoading:profileLoading, isError, error } = useCurrentUser();
    const user = respdata?.users.user 


    




    const {logout} = useAuth()
    //image loading:

     

    

    const name = user ? `${user.firstName} ${user.lastName}` : "LOading..."



     const handleSaveChanges= async () => {
        Alert.alert("Success. Profile updated!")
     }
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Card details" navigation={navigation} showBackArrow={true} showProfilePicture={false} />
            <View style={styles.topOfProfile}>
                <View style={styles.profilePic}>
                    <CustomerAvatar size={140} user={user}/>
                </View>
                <View style={styles.profileInfo}>

                    <Text style={{fontSize:30,marginBottom:0}}>{name}</Text>
                </View>
                
            </View>
            <ScrollView  showsHorizontalScrollIndicator={false}  stickyHeaderIndices={[1]} style={{marginLeft:20, marginRight:20}}>
                <View style={styles.editingSection}>
                    <View style={{padding:20}}>
                        <TextInput mode='outlined' label="Card holder name:" value={name} style={styles.textBox} />
                        <TextInput mode='outlined' label="Card number:" keyboardType="number-pad" maxLength={16} style={styles.textBox} />
                        <View style={{flexDirection: 'row', gap:10}}>
                           <TextInput mode='outlined' label="Expiry date:" keyboardType="number-pad" style={styles.textBox} />
                           <TextInput mode='outlined' label="CVC:" keyboardType="number-pad" maxLength={3} style={styles.textBox} />
                        </View>


                    </View>

                    <View style={{marginTop:'auto', marginBottom:30, paddingHorizontal: 20}}>
                        <Button icon="content-save-outline" mode="contained" onPress={handleSaveChanges} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Save changes</Button>

                    </View>
                </View>
            </ScrollView>

        </View>

    );
  }

