import React, { useState } from "react";
import { View, StyleSheet, Image } from 'react-native';
import {  Text, useTheme, TextInput, Checkbox, CheckboxItem } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import {TextInputMask} from 'react-native-masked-text'

export default function CreateTaskScreen({navigation}:any) {
    const [timeLimit, setTimeLimit] = React.useState(false);
    const [taskTitle, setTaskTitleText] = React.useState("");
    const [taskDesc, setTaskDesc] = React.useState("");
    const [price, setPrice] = React.useState("");

    //u
    const [date, setDate] = useState("");
    return (
        <View style={styles.container}>
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
            </View>
        </View>

    );
}

