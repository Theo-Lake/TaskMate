import React from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip,Button, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import TaskCard from "../../components/cards/TaskCard";
import NoticeCard from "../../components/cards/NoticeBoardCard";
import { FAB } from 'react-native-paper';
import PosterCard from "../../components/cards/PosterCard";

import { useTask } from "../../hooks/useTasks";
import { useUser } from "../../hooks/useUsers";

const assignees=[
    {
        id:'1',
        name:'Joe Doe',
        reputation:2,
    },
    {
        id:'2',
        name:'Doe Joe',
        reputation:4,
    },
    {
        id:'3',
        name:'Moe Moe',
        reputation:3.5,
    }
]
const formatDate = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleDateString('gb-GB')
}

export default function ViewTaskScreen({navigation, route}:any) {
    const taskId = Number(route.params?.taskId);
    const passedTask = route.params?.task;

    const { data, isLoading, isError } = useTask(taskId);

    const fetchedTask = data?.task ?? data;
    const task = passedTask ?? fetchedTask;

    const publisherId = task?.publisherID ?? null;
    const { data: publisherProfile } = useUser(publisherId);
    const publisher = publisherProfile?.users.user;

    if (isLoading) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Loading task...</Text>
                    <ActivityIndicator style={{marginTop:20}} size="large"/>
                </View>
            </View>
        );
    }

    if (isError || !task) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Could not load task.</Text>
                </View>
            </View>
        );
    }

    const imageSource = task.images ? { uri: Array.isArray(task.images) ? task.images[0] : task.images} : require("../../../assets/img/img.png");

    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            <ScrollView>
                <View style={styles.container}>
                    <Image source={imageSource} style={styles.taskImage} resizeMode="cover"/>
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text variant="titleLarge" style={styles.title}>{task.name}</Text>
                    
                    <Text style={{fontSize:20}}>{task.description}</Text>

                    <Text variant="bodyLarge" style={{ marginTop:7, marginBottom:7, textAlign:"left", alignSelf: 'flex-start'}}>Posted by:</Text>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <PosterCard 
                            title={publisher?.username ?? "Unknown user"}
                            review={publisher?.rating ?? 0}
                            />
                    </View>
                    <View style={styles.dateStringContainer}>
                        <IconButton icon="calendar-outline" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {formatDate(task.dueDate)}
                        </Text>
                    </View>
                    <View style={styles.dateStringContainer}>
                        <IconButton icon="map-marker-outline" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {task.location}
                        </Text>
                    </View>
                    <View style={styles.rewardContainer}>
                        <IconButton icon="currency-gbp" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {task.payment}
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.assigneesNumField}>
                            <IconButton icon="account-outline" size={20}
                                iconColor="#49454F"
                                style={{margin:0,padding:0, width:20}}/>
                            <Text style={styles.dateStringText}>
                                {task.peopleRequired}
                            </Text>
                        </View>
                        <View style={styles.assigneesRankField}>
                            {assignees.map((person) => (
                                <View key={person.id} >
                                    <PosterCard 
                                    title={person.name}
                                    review={person.reputation}
                                    />
                                </View>

                            ))}
                        </View>

                    </View>
                    <View style={{flexDirection:'row',gap:5}}>
                        <Button icon="check" mode="contained" onPress={() => navigation.navigate('TasksTab', { screen: 'Tasks' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Accept</Button>
                        <Button icon="message-text-outline" mode="contained" onPress={() => navigation.navigate('TasksTab', { screen: 'Tasks' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Message</Button>
                    </View>

                </View>
            </ScrollView>
        </View>

    );
  }

