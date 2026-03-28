import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {  Text, useTheme, TextInput, Checkbox, CheckboxItem, Button, IconButton } from "react-native-paper";
import {styles} from "./styles"
import * as ImagePicker from 'expo-image-picker'
import CustomHeader from "../../components/navBar/CustomHeader";
import {TextInputMask} from 'react-native-masked-text'

export default function CreateTaskScreen({navigation}:any) {
    const [timeLimit, setTimeLimit] = React.useState(false);
    const [taskTitle, setTaskTitleText] = React.useState("");
    const [taskDesc, setTaskDesc] = React.useState("");
    const [price, setPrice] = React.useState("");
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
        <ScrollView>
            <CustomHeader title="Create Task" navigation={navigation} showBackArrow={true} showProfilePicture={true}/>
            <View style = {styles.content}>
                <TextInput mode='outlined' label="Task title:" value={taskTitle} onChangeText={text => setTaskTitleText(text)} style={styles.textBox}/>
                <TextInput mode='outlined'  label="Task description:" value={taskDesc} onChangeText={text => setTaskDesc(text)} style={styles.textBoxTall} multiline={true} textAlignVertical="top"/>
                <TextInput mode='outlined' label="Enter revard value:" value={price} onChangeText={setPrice} style={styles.textBox} left={<TextInput.Icon icon="currency-gbp"/>}/>

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
                        render={props => (
                            <TextInputMask
                                {...props}
                                type={'datetime'}
                                options={{format:'DD/MM/YYYY'}}
                                value={date}
                                onChangeText={text => setDate(text)}
                            />
                        )}
                    />
                )}
                <Text variant="labelLarge" style={styles.title}>Upload task image:</Text>
                
                {imageContent}
                <TextInput mode='outlined' label="Assignees:" value={assignees} onChangeText={setAssignees} style={styles.textBox} left={<TextInput.Icon icon="account-outline"/>}/>
                <View style={{marginHorizontal:100}}>
                    <Button icon="pencil" mode="contained" onPress={() => navigation.navigate('TasksTab', { screen: 'Tasks' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10, width:'100%'}}>Post Task</Button>
                </View>
            </View>
        </ScrollView>

    );
}

