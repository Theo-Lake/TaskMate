import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {  Text, useTheme, TextInput, Checkbox,  Button, IconButton, Menu } from "react-native-paper";
import {styles} from "./styles"
import * as ImagePicker from 'expo-image-picker'
import { uploadTaskImage } from "../../lib/uploadImage";
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
    const [taskType, setTaskType] = useState("");
    const [taskTypeMenuVisible, setTaskTypeMenuVisible] = useState(false);
    const [peopleRequired, setPeopleRequired] = useState("");
    //u
    const [date, setDate] = useState("");

    //image loading:
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // errors
    const [errors, setErrors] = useState<any>({});

    // location
    const [location, setLocation] = useState("");

    const { mutate: createTask, isPending } = useCreateTask();

    const handleSelectTaskType = (type: string) => {
        setTaskType(type);
        setTaskTypeMenuVisible(false);
    };

    // nicer looking text for category picker
    const getTaskTypeLabel = (type: string) => {
        switch (type) {
            case "tutoring":
                return "Tutoring";
            case "delivery":
                return "Delivery";
            case "freelance":
                return "Freelance";
            case "moving":
                return "Moving";
            case "tech_support":
                return "Tech support";
            case "general":
                return "General";
            case "other":
                return "Other";
            default:
                return "Category";
        }
    };

    //Images loading:
    const pickImageFromPhone = async() =>{
        let imagRes = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect:[4,3],
            quality:0.3,
        });
        if (!imagRes.canceled){
            const uri = imagRes.assets[0].uri;
            setImageUri(uri);
            try {
                const url = await uploadTaskImage(uri);
                setImageUrl(url);
            } catch (e: any) {
                console.error("Image upload failed:", e.message);
            }
        }
    }
    let imageContent;

    if (imageUri && imageUri?.trim() !== "") {
        imageContent = (
            <View style={styles.imagePrevContain}>
                <Image source={{uri: imageUri}} style={styles.img}/>
                <Button mode="text"  onPress={() => {setImageUri(null); setImageUrl(null);}} textColor="red" icon="delete" >
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

        const imagesArray = imageUrl ? [imageUrl] : [];

        const formData = {
            name: taskTitle,
            description: taskDesc,
            payment: Number(price),
            dueDate: parsedDueDate,
            type: taskType,
            images: imagesArray,
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
            peopleRequired: Number(peopleRequired),
            images: imagesArray,
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
                    <TextInput 
                        mode="outlined" 
                        label="Location:" 
                        value={location} 
                        onChangeText={text => setLocation(text)} 
                        style={styles.textBox} 
                        error={!!errors.location}
                    />
                    {errors.location && (<Text style={{ color: "red"}}>{errors.location[0]}</Text>)}
                    <TextInput 
                        mode="outlined" 
                        label="Number of People:" 
                        value={peopleRequired} 
                        onChangeText={text => setPeopleRequired(text)} 
                        style={styles.textBox}
                        left={<TextInput.Icon icon="account-outline"/>}
                        error={!!errors.peopleRequired}
                    />
                    {errors.peopleRequired && (<Text style={{ color: "red"}}>{errors.peopleRequired[0]}</Text>)}
                    
                    <Menu visible={taskTypeMenuVisible} onDismiss={() => setTaskTypeMenuVisible(false)} anchor={<Button mode="outlined" onPress={() => setTaskTypeMenuVisible(true)} icon="chevron-down" style={styles.categoryBox}>{getTaskTypeLabel(taskType)}</Button>}>
                        <Menu.Item title="Tutoring" onPress={() => handleSelectTaskType("tutoring")}/>
                        <Menu.Item title="Delivery" onPress={() => handleSelectTaskType("delivery")}/>
                        <Menu.Item title="Freelance" onPress={() => handleSelectTaskType("freelance")}/>
                        <Menu.Item title="Moving" onPress={() => handleSelectTaskType("moving")}/>
                        <Menu.Item title="Tech support" onPress={() => handleSelectTaskType("tech_support")}/>
                        <Menu.Item title="General" onPress={() => handleSelectTaskType("general")}/>
                        <Menu.Item title="Other" onPress={() => handleSelectTaskType("other")}/>
                    </Menu>
                    {errors.type && <Text style={{color:"red"}}>{errors.type[0]}</Text>}
                    
                    <View style={{alignItems:"center"}}>
                        <Button icon="pencil" mode="contained" onPress={handlePostTask} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10, width:'100%'}} disabled={isPending} loading={isPending}>{isPending ? "Submitting..." : "Post Task"}</Button>
                    </View>
                </View>
            </ScrollView>
        </View>
        </>

    );
}

