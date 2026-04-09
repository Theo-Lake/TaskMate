import React from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip,Button, IconButton } from "react-native-paper";
import {styles} from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import TaskCard from "../../components/cards/TaskCard";
import NoticeCard from "../../components/cards/NoticeBoardCard";
import { FAB } from 'react-native-paper';
import PosterCard from "../../components/cards/PosterCard"

const task = {
    id: '1',
    title: 'Study buddy',
    price: '10',
    imageUrl: require('../../assets/img/img.png'),
    description: 'need study buddy for 2 hours example example example example example example example example example example example example example',
    poster: 'Joe Doe',
    posterReputation:3.5,
    date: '2020-12-11T14:30:00.000Z',
    amountOfAssignees: 6
  }
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

export default function ViewEventScreen({navigation}:any) {
    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Event" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            <ScrollView>
                <View style={styles.container}>
                    {task.imageUrl && (
                        <Image source={task.imageUrl} style={styles.taskImage} resizeMode="cover"/>

                    )}
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text variant="titleLarge" style={styles.title}>{task.title}</Text>
                    
                    <Text style={{fontSize:20}}>{task.description}</Text>

                    <Text variant="bodyLarge" style={{ marginTop:7, marginBottom:7, textAlign:"left", alignSelf: 'flex-start'}}>Posted by:</Text>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <PosterCard 
                            title={task.poster}
                            review={task.posterReputation}
                            />
                    </View>
                    <View style={styles.dateStringContainer}>
                        <IconButton icon="calendar-outline" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {formatDate(task.date)}
                        </Text>
                    </View>
                    
                    <View style={styles.bottomContainer}>
                        <View style={styles.assigneesNumField}>
                            <IconButton icon="account-outline" size={20}
                                iconColor="#49454F"
                                style={{margin:0,padding:0, width:20}}/>
                            <Text style={styles.dateStringText}>
                                {task.amountOfAssignees}
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

