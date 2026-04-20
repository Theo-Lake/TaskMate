import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {  Text, useTheme, TextInput, Checkbox,  Button, IconButton } from "react-native-paper";
import {styles} from "./styles"
import * as ImagePicker from 'expo-image-picker'
import CustomHeader from "../../components/navBar/CustomHeader";
import {TextInputMask} from 'react-native-masked-text'

import { useCreateEvent } from "../../hooks/useEvents";
import { validate } from "../../validation/validate";
import { EventSchema } from "../../validation/schemas/events";

export default function CreateEventScreen({navigation}:any) {
    const [timeLimit, setTimeLimit] = React.useState(false);
    const [eventTitle, setTaskTitleText] = React.useState("");
    const [eventDesc, setTaskDesc] = React.useState("");
    const [assignees, setAssignees] = useState("");
    //u
    const [date, setDate] = useState("");

    //image loading:
    const [image, setImage] = useState<string | null>(null);

    //Images loading:
    const pickImageFromPhone = async() =>{
        let imagRes = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect:[4,3],
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
                <Image source={{uri: image}} style={styles.img}/>
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
        <View>
            <CustomHeader title="Create Event" navigation={navigation} showBackArrow={true} showProfilePicture={false}/>
            <ScrollView>
            <View style = {styles.content}>
                <TextInput mode='outlined' label="Event title:" value={eventTitle} onChangeText={text => setTaskTitleText(text)} style={styles.textBox}/>
                <TextInput mode='outlined'  label="Event description:" value={eventDesc} onChangeText={text => setTaskDesc(text)} style={styles.textBoxTall} multiline={true} textAlignVertical="top"/>

                <Checkbox.Item
                    label="Time limit"
                    status={timeLimit ? 'checked' : 'unchecked'}
                    onPress={() => setTimeLimit(!timeLimit)}
                    position="leading"
                    mode= "android"
                    labelStyle={{ textAlign: 'left', color: '#333' }}
                    />
                {timeLimit && (
                    <TextInput
                        mode="flat"
                        label={"Due Date (DD/MM/YYYY)"}
                        style={styles.textBox}
                        left={<TextInput.Icon icon="calendar" />}
                        keyboardType="numeric"
                        value={date}
                        onChangeText={setDate}
                        render={props => (
                            <TextInputMask
                                {...props}
                                type={'datetime'}
                                options={{format:'DD/MM/YYYY'}}
                                
                            />
                        )}
                    />
                )}
                <Text variant="labelLarge" style={styles.title}>Upload event image:</Text>
                
                {imageContent}
                <TextInput mode='outlined' label="Participants:" value={assignees} onChangeText={setAssignees} style={styles.textBox} left={<TextInput.Icon icon="account-outline"/>}/>
                <View style={{marginHorizontal:100}}>
                    <Button icon="pencil" mode="contained" onPress={() => navigation.navigate('TasksTab', { screen: 'Tasks' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10, width:'100%'}}>Post Event</Button>
                </View>
            </View>
        </ScrollView>
        </View>


    );
}

