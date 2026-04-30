import React, { useMemo } from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, Button, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import ProfileCard from "../../components/cards/ProfileCard";

import { useTask, useApplyForTask, useTaskAssignmentsByTask } from "../../hooks/useTasks";
import { useUser, useAllUsers } from "../../hooks/useUsers";

const formatDate = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleDateString('gb-GB')
}

export default function ViewTaskScreen({navigation, route}:any) {
    const taskId = Number(route.params?.taskId);
    const passedTask = route.params?.task;
    const fromMyTasks = route.params?.fromMyTasks;

    const { data, isLoading, isError } = useTask(taskId);
    const { mutate: applyForTask, isPending: isApplying } = useApplyForTask();

    const fetchedTask = data?.task ?? data;
    const task = passedTask ?? fetchedTask;

    // applicants
    const { data: assignmentsData, isLoading: assignmentsLoading, isError: assignmentsError } = useTaskAssignmentsByTask(taskId);
    const { data: allUsersResponse, isLoading: usersLoading } = useAllUsers();

    const assignmentRows = Array.isArray(assignmentsData?.taskAssignment)
        ? assignmentsData.taskAssignment
        : Array.isArray(assignmentsData)
        ? assignmentsData
        : [];

    const allUsers = Array.isArray(allUsersResponse?.users)
        ? allUsersResponse.users
        : Array.isArray(allUsersResponse)
        ? allUsersResponse
        : [];

    const assignees = useMemo(() => {
        return assignmentRows.map((assignment: any) => {
            const userId = Number(assignment.assigneeID ?? assignment.userID ?? assignment.id);
            const user = allUsers.find((u: any) => Number(u.userID) === userId);

            return {
                userID: userId,
                username: user?.username ?? `User ${userId}`,
                rating: user?.rating ?? 0,
                status: assignment.status ?? "pending",
            };
        })
        .filter((applicant: any) => applicant.userID);
    }, [assignmentRows, allUsers]);

    const visibleApplicants = assignees.filter(
        (applicant: any) => applicant.status !== "accepted"
    );

    const handleAcceptTask = () => {
        if (!taskId) return;

        applyForTask(taskId, {
            onSuccess: () => {
                navigation.navigate("TasksTab", { screen: "Tasks"});
            },
            onError: (error: any) => {
                console.error("Error:", error);
                console.log("status:", error?.response?.status);
                console.log("data:", error?.response?.data);
                console.log("url:", error?.config?.url);
            }
        })
    }

    // nicer looking text for category
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

    if (isLoading || assignmentsLoading || usersLoading) {
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

    if (isError || assignmentsError || !task) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Could not load task.</Text>
                </View>
            </View>
        );
    }

    const hasImage = task.images && (Array.isArray(task.images) ? task.images.length >0: true);
    const imageSource = Array.isArray(task.images) ? task.images[0] : task.images

    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} onBackPress={fromMyTasks ? () => navigation.navigate("MyTasksTab", { screen: "MyTasks" }) : undefined} />
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
                    <Text variant="titleLarge" style={styles.title}>{task.name}</Text>
                    
                    <Text style={{fontSize:20}}>{task.description}</Text>

                    <Text variant="bodyLarge" style={{ marginTop:7, marginBottom:7, textAlign:"left", alignSelf: 'flex-start'}}>Posted by:</Text>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <ProfileCard userId={task?.publisherID} onPress={() => navigation.navigate('PublicProfileScreen', {userId: task?.publisherID})}/>
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
                    <View style={styles.dateStringContainer}>
                        <IconButton icon="tag-outline" size={20}
                            iconColor="#49454F"
                            style={{margin:0,padding:0, width:20}}/>
                        <Text style={styles.dateStringText}>
                            {getTaskTypeLabel(task.type)}
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
                            {visibleApplicants.length > 0 ? (
                                visibleApplicants.map((person: any) => {
                                    const assigneeId = Number(person.userID ?? person.assigneeID ?? person.id);

                                    return (
                                        <View key={String(person.userID)} style={{ width: "100%", marginBottom: 14}}>
                                            <ProfileCard userId={person.userID} onPress={() => navigation.navigate('PublicProfileScreen', {userId: person.userID})}/>
                                        </View>
                                    );
                                })
                            ) : (<Text>No applicants yet.</Text>)}
                            
                        </View>

                    </View>
                    <View style={{flexDirection:'row',gap:5}}>
                        <Button 
                            icon="check" 
                            mode="contained" 
                            onPress={handleAcceptTask} 
                            style={styles.btn} 
                            labelStyle={{fontSize:20, lineHeight:25}} 
                            contentStyle={{marginVertical:10}}
                            loading={isApplying}
                            disabled={isApplying}
                            >Apply</Button>
                        <Button icon="message-text-outline" mode="contained" onPress={() => navigation.navigate('TasksTab', { screen: 'Tasks' })} style={styles.btn} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Message</Button>
                    </View>

                </View>
            </ScrollView>
        </View>

    );
  }

