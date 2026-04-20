import React from "react";
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, useTheme, Button, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import PosterCard from "../../components/cards/PosterCard"

import { useEvent } from "../../hooks/useEvents";
import { useUser } from "../../hooks/useUsers";

const task = {
    id: '1',
    title: 'Study buddy',
    price: '10',
    imageUrl: require('../../../assets/img/img.png'),
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

export default function ViewEventScreen({navigation, route}:any) {
    const eventId = Number(route.params?.eventId);
    const passedEvent = route.params?.event;

    const { data, isLoading, isError } = useEvent(eventId);

    const fetchedEvent = data?.event ?? data;
    const event = passedEvent ?? fetchedEvent;

    const publisherId = event?.publisherID ?? null;
    const { data: publisherProfile } = useUser(publisherId);
    const publisher = publisherProfile?.users.user;

    // nicer looking text for category
    const getEventTypeLabel = (type: string) => {
        switch (type) {
            case "social":
                return "Social";
            case "sport":
                return "Sport";
            case "academic":
                return "Academic";
            case "career":
                return "Career";
            case "cultural":
                return "Cultural";
            case "volunteering":
                return "Volunteering";
            case "other":
                return "Other";
            default:
                return "Category";
        }
    };

    if (isLoading) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Event" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Loading event...</Text>
                    <ActivityIndicator style={{marginTop:20}} size="large"/>
                </View>
            </View>
        );
    }

    if (isError || !event) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Event" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Could not load event.</Text>
                </View>
            </View>
        );
    }

    const imageSource = event.images ? { uri: Array.isArray(event.images) ? event.images[0] : event.images} : require("../../../assets/img/img.png");

    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Event" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            <ScrollView>
                <View style={styles.container}>
                    <Image source={imageSource} style={styles.taskImage} resizeMode="cover"/>
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text variant="titleLarge" style={styles.title}>{event.name}</Text>
                    
                    <Text style={{fontSize:20}}>{event.description}</Text>

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
                            {formatDate(event.dueDate)}
                        </Text>
                    </View>
                    <View style={styles.dateStringContainer}>
                        <IconButton icon="map-marker-outline" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {event.location}
                        </Text>
                    </View>
                    <View style={styles.dateStringContainer}>
                        <IconButton icon="tag-outline" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {getEventTypeLabel(event.type)}
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.assigneesNumField}>
                            <IconButton icon="account-outline" size={20}
                                iconColor="#49454F"
                                style={{margin:0,padding:0, width:20}}/>
                            <Text style={styles.dateStringText}>
                                {event.peopleRequired}
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

