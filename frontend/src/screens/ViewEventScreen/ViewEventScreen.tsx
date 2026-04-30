import React from "react";
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, useTheme, Button, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import ProfileCard from "../../components/cards/ProfileCard";

import { useEvent, useEventAssignmentsByEvent, useApplyForEvent } from "../../hooks/useEvents";


const formatDate = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleDateString('gb-GB')
}

export default function ViewEventScreen({navigation, route}:any) {
    const eventID = Number(route.params?.eventID || route.params?.eventId);
    const passedEvent = route.params?.event;

    const { data, isLoading, isError } = useEvent(eventID);

    const {data:assignmentsData, isLoading: assignmentsLoading} = useEventAssignmentsByEvent(eventID);
    const {mutate: applyForEvent, isPending:isApplying}=useApplyForEvent();
    const fetchedEvent = data?.event ?? data;
    const event = passedEvent ?? fetchedEvent;

    const assignees = Array.isArray(assignmentsData?.eventAssignment)
    ? assignmentsData.eventAssignment
    : Array.isArray(assignmentsData)
    ? assignmentsData
    : [];

    const handleAcceptEvent=()=>{
        if (!eventID) return;
    
        applyForEvent(eventID,{
            onSuccess: () => {
                navigation.navigate('TasksTab', {screen:'Tasks'})
            },
            onError: (error:any) =>{
                console.error("Error:", error)
            }
        })
    }
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

    if (isLoading || assignmentsLoading) {
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

    const hasImage = event.images && (Array.isArray(event.images) ? event.images.length >0: true);
    const imageSource = Array.isArray(event.images) ? event.images[0] : event.images

    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Event" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            <ScrollView>
                <View style={styles.container}>
                    {hasImage && (
                        <Image
                            source={{uri: imageSource}}
                            style={styles.taskImage}
                            resizeMode="cover"
                        />
                    )}
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text variant="titleLarge" style={styles.title}>{event.name}</Text>
                    
                    <Text style={{fontSize:20}}>{event.description}</Text>

                    <Text variant="bodyLarge" style={{ marginTop:7, marginBottom:7, textAlign:"left", alignSelf: 'flex-start'}}>Posted by:</Text>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <ProfileCard userId={event.publisherID} onPress={() => navigation.navigate('PublicProfileScreen', {userId: event.publisherID})}/>
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
                            {assignees.length >0 ?(
                                <View>
                                    <Text>Applicants list:</Text>
                                    {assignees.map((person:any)=>{
                                        const assigneeId = Number(person.userID ?? person.assigneeID ?? person.id);
                                        return(
                                            <View key={String(assigneeId)} style={{ width: "100%", marginBottom: 10 }}>
                                                <ProfileCard userId={assigneeId} onPress={() => navigation.navigate('PublicProfileScreen', {userId: assigneeId})}/>
                                            </View>
                                        )
                                    })}
                                </View>
                            ) : (
                                <Text>No attendees yet</Text>
                            )}
                        </View>

                    </View>
                    <View style={{flexDirection:'row',gap:5}}>
                        <Button icon="check" mode="contained" onPress={handleAcceptEvent} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Apply</Button>
                    </View>

                </View>
            </ScrollView>
        </View>

    );
  }

