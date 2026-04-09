import React, {useState} from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {  Text, useTheme, TextInput, Button, IconButton  } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
//#TODO FIX SAVE CHANGES BUTTON
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import {styles} from "./styles"

export default function SettingsScreen({navigation}:any) {
    const [FirstNameText, setFirstNameText] = React.useState("");
    const [SecondNameText, setSecondNameText] = React.useState("");
    const name="Joe Doe"
     //image loading:
     const [image, setImage] = useState<string | null>(null);

     //Images loading:
     const pickImageFromPhone = async() =>{
         let imagRes = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ['images'],
             allowsEditing: true,
             aspect:[1,1],
             quality:1
         });
         if (!imagRes.canceled){
             setImage(imagRes.assets[0].uri)// saves way(uri) to the image 
         }
     }
     let imageContent;
 
     if (image) {
         imageContent = (
             <View style={styles.imagePrevContain}>
                 <Image source={{uri: image}} style={styles.img} resizeMode="cover"/>
                 <Button mode="text"  onPress={() => setImage(null)} textColor="red" icon="delete" >
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
    return (
        <View style={{flex:1}}>
            <CustomHeader title="Settings" navigation={navigation} showBackArrow={true} showProfilePicture={false} />
            <View style={styles.topOfProfile}>
                <View style={styles.profilePic}>
                    <CustomerAvatar size={140} user={null}/>
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
                        <Button icon="content-save-outline" mode="contained" onPress={() => console.log('Saved Changes')} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Save changes</Button>
                    </View>
                </View>
            </ScrollView>

        </View>

    );
  }

