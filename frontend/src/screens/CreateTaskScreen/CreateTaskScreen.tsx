import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {  Text, useTheme, TextInput, Checkbox,  Button, IconButton } from "react-native-paper";
import {styles} from "./styles"
import * as ImagePicker from 'expo-image-picker'
import CustomHeader from "../../components/navBar/CustomHeader";
import {TextInputMask} from 'react-native-masked-text'

// logic imports
import { useCreateTask } from "../../hooks/useTasks";
import { validate } from "../../validation/validate";
import { TaskSchema } from "../../validation/schemas/tasks";

export default function CreateTaskScreen({navigation}:any) {
    const [timeLimit, setTimeLimit] = React.useState(false);
    const [taskTitle, setTaskTitleText] = React.useState("");
    const [taskDesc, setTaskDesc] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [assignees, setAssignees] = useState("");
    const [taskType, setTaskType] = useState("other");
    const [peopleRequired, setPeopleRequired] = useState("");
    //u
    const [date, setDate] = useState("");

    //image loading:
    const [image, setImage] = useState<string | null>(null);

    // errors
    const [errors, setErrors] = useState<any>({});

    // location
    const [location, setLocation] = useState("");

    const { mutate: createTask, isPending } = useCreateTask();

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

    const parseDueDate = (value: string) => {
        const [day,month,year] = value.split("/");
        if (!day || !month || !year) return null;

        const parsed = new Date(Number(year), Number(month) - 1, Number(day));
        if (Number.isNaN(parsed.getTime())) return null;
        
        return parsed.toISOString();
    }

    const getFallbackDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d.toISOString();
    }

    const handlePostTask = () => {
        console.log("post pressed");

        const parsedDueDate = timeLimit ? parseDueDate(date) : getFallbackDate();

        const formData = {
            name: taskTitle,
            description: taskDesc,
            payment: Number(price),
            dueDate: parsedDueDate,
            type: taskType,
            images: ["https://picsum.photos/id/237/200"],
            location: location,
            peopleRequired: Number(peopleRequired),
        };

        const result = validate(TaskSchema, formData);
        
        if (!result.success) {
            console.log("validation failed:", result.errors.fieldErrors);
            setErrors(result.errors.fieldErrors);
            return;
        }

        setErrors({});

        console.log("validated data:", result.data);
        createTask({
            ...result.data,
            assignees,
            location,
            peopleRequired: Number(peopleRequired)
        },
        {
            onSuccess: () => {
                navigation.navigate("TasksTab", { screen: "Tasks" });
            },
            onError: (error: any) => {
                console.error("Error:", error);
                console.log("status:", error?.response?.status);
                console.log("data:", error?.response?.data);
                console.log("url:", error?.config?.url);
            }
        })
    };


    return (
        <>
        <View>
            <CustomHeader title="Create Task" navigation={navigation} showBackArrow={true} showProfilePicture={false}/>
        </View>
        <View style={{flex:1}}>
            <ScrollView>
                <View style = {styles.content}>
                    <TextInput mode='outlined' label="Task title:" value={taskTitle} onChangeText={text => setTaskTitleText(text)} style={styles.textBox} error={!!errors.name}/>{errors.name && <Text style={{ color: "red" }}>{errors.name[0]}</Text>}
                    <TextInput mode='outlined'  label="Task description:" value={taskDesc} onChangeText={text => setTaskDesc(text)} style={styles.textBoxTall} multiline={true} textAlignVertical="top" error={!!errors.description}/>{errors.description && <Text style={{ color: "red" }}>{errors.description[0]}</Text>}
                    <TextInput mode='outlined' label="Enter reward value:" value={price} onChangeText={setPrice} style={styles.textBox} left={<TextInput.Icon icon="currency-gbp"/>} error={!!errors.payment}/>{errors.payment && <Text style={{ color: "red" }}>{errors.payment[0]}</Text>}

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
                    )}{errors.dueDate && (<Text style={{ color: "red" }}>{errors.dueDate[0]}</Text>)}


                    <Text variant="labelLarge" style={styles.title}>Upload task image:</Text>
                    
                    {imageContent}
                    <TextInput mode="outlined" label="Location:" value={location} onChangeText={text => setLocation(text)} style={styles.textBox} error={!!errors.location}>{errors.location && (<Text style={{ color: "red"}}>{errors.location[0]}</Text>)}</TextInput>
                    <TextInput mode="outlined" label="Number of People:" value={peopleRequired} onChangeText={text => setPeopleRequired(text)} style={styles.textBox} error={!!errors.peopleRequired}>{errors.peopleRequired && (<Text style={{ color: "red"}}>{errors.peopleRequired[0]}</Text>)}</TextInput>
                    <TextInput mode='outlined' label="Assignees:" value={assignees} onChangeText={text => setAssignees(text)} style={styles.textBox} left={<TextInput.Icon icon="account-outline"/>} error={!!errors.assignees}>{errors.assignees && (<Text style={{ color: "red"}}>{errors.assignees[0]}</Text>)}</TextInput>
                    <View style={{alignItems:"center"}}>
                        <Button icon="pencil" mode="contained" onPress={handlePostTask} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10, width:'100%'}} disabled={isPending} loading={isPending}>{isPending ? "Submitting..." : "Post Task"}</Button>
                    </View>
                </View>
            </ScrollView>
        </View>
        </>

    );
}

