import React, {useEffect, useState} from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {  Text, useTheme, TextInput, Button, IconButton  } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
//#TODO FIX SAVE CHANGES BUTTON. Optional - add delete user button
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import {styles} from "./styles"

//logic hooks
import { useCurrentUser, useUpdateUser } from "../../hooks/useUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

export default function SettingsScreen({navigation}:any) {
    const {data: user} = useCurrentUser()
    const {mutate: UpdateProfile, isPending} = useUpdateUser();

    const [FirstNameText, setFirstNameText] = React.useState("");
    const [SecondNameText, setSecondNameText] = React.useState("");
    const {logout} = useAuth()
    //image loading:

    const [imageUri, setImageUri] = useState<string | null>(null);
        //image stored as string base64:
    const [imageBse64, setImageBase64] = useState<string | null>(null);
     
    useEffect(() =>{
        if (user) {
            setFirstNameText(user.firstName || "");
            setSecondNameText(user.lastName || "");
            if (user.profilePicture && user.profilePicture.length>0 && user.profilePicture !=='null'){
                setImageUri(user.profilePicture)
            }else{
                setImageUri(null);
            }
        }
    }, [user])
    

    const name = user ? `${user.firstName} ${user.lastName}` : "LOading..."


     //Images loading:
     const pickImageFromPhone = async() =>{
         let imagRes = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ['images'],
             allowsEditing: true,
             aspect:[1,1],
             quality:0.3,
             base64:true,
         });
         if (!imagRes.canceled){
            setImageUri(imagRes.assets[0].uri)// saves way(uri) to the image 
             const formatedImgBase64 = `data:image/jpeg;base64, ${imagRes.assets[0].base64}`;
             setImageBase64(formatedImgBase64);
         }
     }
     let imageContent;
 
     if (imageUri && imageUri.trim() !== "") {
         imageContent = (
             <View style={styles.imagePrevContain}>
                 <Image source={{uri: imageUri}} style={styles.img} resizeMode="cover"/>
                 <Button mode="text"  onPress={() => {setImageUri(null);setImageBase64(null)}} textColor="red" icon="delete" >
                     Delete image
                 </Button>
             </View>
         );
     } else {
         imageContent = (
             <TouchableOpacity 
                 style={styles.imagePicker} 
                 onPress={pickImageFromPhone}
             >
                 <IconButton icon='camera' size={30}/>
                 <Text>Upload image</Text>
             </TouchableOpacity>
         );
     }

     const handleSaveChanges= () => {
        const payload: any ={
            firstName: FirstNameText.trim(),
            lastName: SecondNameText.trim(),
        }
        if (imageBse64){
            payload.profilePicture = imageBse64;
        }
        UpdateProfile(payload,{
            onSuccess:()=>{
                Alert.alert("Success. Profile updated!")
            },
            onError:(error: any)=>{
                Alert.alert("Error. Profile not updated!", error.response?.data?.error)

            }
        })
     }

     const handleLogout= async () => {
        Alert.alert(
            "Log out",
            "Do you want to log out?",
            [
                {text: "Cancel", style:'cancel'},
                {
                    text:'Log Out', 
                    style: "destructive",
                    onPress: async()=>{
                        try{
                            await AsyncStorage.removeItem('myID')
                            await logout();
                        } catch (error){
                            Alert.alert("Errorr", "Failed to log out")
                        }
                    }
                }
            ]
        )
     }
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Settings" navigation={navigation} showBackArrow={true} showProfilePicture={false} />
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
                        <TextInput mode='outlined' label="First Name" value={FirstNameText} onChangeText={text => setFirstNameText(text)} style={styles.textBox} />
                        <TextInput mode='outlined' label="Second Name" value={SecondNameText} onChangeText={text => setSecondNameText(text)}  style={styles.textBox} />
                        <Text variant="labelLarge" style={styles.title}>Upload avatar:</Text>
                    
                        {imageContent}
                    </View>

                    <View style={{marginTop:'auto', marginBottom:30}}>
                        <Button icon="content-save-outline" mode="contained" onPress={handleSaveChanges} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Save changes</Button>
                        <View style={styles.bottomButtons}>
                            <View style={{flex:1}}>
                                <Button icon="logout" mode="contained" onPress={handleLogout} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:16, lineHeight:25}} contentStyle={{marginVertical:10}}>Log out</Button>
                            </View>
                            <View style={{flex:1}}>
                                <Button icon="lock-reset" mode="contained" onPress={() => console.log(" 423")} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:16, lineHeight:25}} contentStyle={{marginVertical:10}}>Reset password</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>

    );
  }

