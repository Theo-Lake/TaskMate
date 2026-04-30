import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, IconButton, Menu } from "react-native-paper";
import { styles } from "./styles"
import * as ImagePicker from 'expo-image-picker'
import CustomHeader from "../../components/navBar/CustomHeader";
import { TextInputMask } from 'react-native-masked-text'
import { useUpdateTask } from "../../hooks/useTasks";

const isoToDisplay = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const parseDueDate = (value: string) => {
    const [day, month, year] = value.split("/");
    if (!day || !month || !year || year.length < 4) return null;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString();
};

const getTaskTypeLabel = (type: string) => {
    switch (type) {
        case "tutoring": return "Tutoring";
        case "delivery": return "Delivery";
        case "freelance": return "Freelance";
        case "moving": return "Moving";
        case "tech_support": return "Tech support";
        case "general": return "General";
        case "other": return "Other";
        default: return "Category";
    }
};

export default function EditTaskScreen({ navigation, route }: any) {
    const { taskId, task } = route.params ?? {};

    const [taskTitle, setTaskTitle] = useState(task?.name ?? "");
    const [taskDesc, setTaskDesc] = useState(task?.description ?? "");
    const [price, setPrice] = useState(String(task?.payment ?? ""));
    const [date, setDate] = useState(isoToDisplay(task?.dueDate ?? ""));
    const [location, setLocation] = useState(task?.location ?? "");
    const [peopleRequired, setPeopleRequired] = useState(String(task?.peopleRequired ?? ""));
    const [taskType, setTaskType] = useState(task?.type ?? "");
    const [taskTypeMenuVisible, setTaskTypeMenuVisible] = useState(false);

    const existingImage = Array.isArray(task?.images) ? task.images[0] : task?.images ?? null;
    const [imageUri, setImageUri] = useState<string | null>(existingImage);

    const { mutate: updateTask, isPending } = useUpdateTask(Number(taskId));

    const pickImageFromPhone = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
            base64: true,
        });
        if (!result.canceled) {
            setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const handleSave = () => {
        const dueDate = parseDueDate(date);
        const imagesArray = imageUri ? [imageUri] : [];

        updateTask(
            {
                name: taskTitle,
                description: taskDesc,
                payment: Number(price),
                dueDate: dueDate ?? task?.dueDate,
                type: taskType,
                images: imagesArray,
                location,
                peopleRequired: Number(peopleRequired),
            },
            {
                onSuccess: () => navigation.navigate('ViewOwnTask', { taskId: Number(taskId), task }),
                onError: (error: any) => {
                    console.error("Update error:", error);
                    console.log("status:", error?.response?.status);
                    console.log("data:", JSON.stringify(error?.response?.data));
                },
            }
        );
    };

    const imageContent = imageUri ? (
        <View style={styles.imagePrevContain}>
            <Image source={{ uri: imageUri }} style={styles.img} />
            <Button mode="text" onPress={() => setImageUri(null)} textColor="red" icon="delete">
                Delete image
            </Button>
        </View>
    ) : (
        <TouchableOpacity style={styles.imagePicker} onPress={pickImageFromPhone}>
            <IconButton icon='camera' size={30} />
            <Text>Upload image</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Edit Task" navigation={navigation} showBackArrow={true} showProfilePicture={false} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                <ScrollView>
                    <View style={styles.content}>
                        <TextInput mode='outlined' label="Task title:" value={taskTitle} onChangeText={setTaskTitle} style={styles.textBox} />
                        <TextInput mode='outlined' label="Task description:" value={taskDesc} onChangeText={setTaskDesc} style={styles.textBoxTall} multiline textAlignVertical="top" />
                        <TextInput mode='outlined' label="Enter reward value:" value={price} onChangeText={setPrice} style={styles.textBox} left={<TextInput.Icon icon="currency-gbp" />} keyboardType="numeric" />
                        <TextInput
                            mode="flat"
                            label="Due Date (DD/MM/YYYY)"
                            style={styles.textBox}
                            left={<TextInput.Icon icon="calendar" />}
                            keyboardType="numeric"
                            value={date}
                            onChangeText={setDate}
                            render={props => (
                                <TextInputMask
                                    {...(props as any)}
                                    type={'datetime'}
                                    options={{ format: 'DD/MM/YYYY' }}
                                />
                            )}
                        />
                        <Text variant="labelLarge" style={styles.title}>Upload task image:</Text>
                        {imageContent}

                        <TextInput mode='outlined' label="Location:" value={location} onChangeText={setLocation} style={styles.textBox} left={<TextInput.Icon icon="map-marker-outline" />} />
                        <TextInput mode='outlined' label="Number of people:" value={peopleRequired} onChangeText={setPeopleRequired} style={styles.textBox} left={<TextInput.Icon icon="account-outline" />} keyboardType="numeric" />

                        <Menu
                            visible={taskTypeMenuVisible}
                            onDismiss={() => setTaskTypeMenuVisible(false)}
                            anchor={
                                <Button mode="outlined" onPress={() => setTaskTypeMenuVisible(true)} icon="chevron-down" style={styles.categoryBox}>
                                    {getTaskTypeLabel(taskType)}
                                </Button>
                            }
                        >
                            <Menu.Item title="Tutoring" onPress={() => { setTaskType("tutoring"); setTaskTypeMenuVisible(false); }} />
                            <Menu.Item title="Delivery" onPress={() => { setTaskType("delivery"); setTaskTypeMenuVisible(false); }} />
                            <Menu.Item title="Freelance" onPress={() => { setTaskType("freelance"); setTaskTypeMenuVisible(false); }} />
                            <Menu.Item title="Moving" onPress={() => { setTaskType("moving"); setTaskTypeMenuVisible(false); }} />
                            <Menu.Item title="Tech support" onPress={() => { setTaskType("tech_support"); setTaskTypeMenuVisible(false); }} />
                            <Menu.Item title="General" onPress={() => { setTaskType("general"); setTaskTypeMenuVisible(false); }} />
                            <Menu.Item title="Other" onPress={() => { setTaskType("other"); setTaskTypeMenuVisible(false); }} />
                        </Menu>

                        <Button
                            icon="content-save"
                            mode="contained"
                            onPress={handleSave}
                            style={styles.btn}
                            labelStyle={{ fontSize: 20, lineHeight: 25 }}
                            contentStyle={{ marginVertical: 10 }}
                            loading={isPending}
                            disabled={isPending}
                        >
                            Save Changes
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
