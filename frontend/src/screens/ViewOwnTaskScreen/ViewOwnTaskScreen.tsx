import React, { useMemo } from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, Button, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import ProfileCard from "../../components/cards/ProfileCard"

import { useTask, useDeleteTask, useAcceptApplication, useRejectApplication, useTaskAssignmentsByTask } from "../../hooks/useTasks";
import { useUser, useAllUsers } from "../../hooks/useUsers";

const formatDate = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleDateString('gb-GB')
}

export default function ViewOwnTaskScreen({navigation, route}:any) {
    const taskId = Number(route.params?.taskId);
    const passedTask = route.params?.task;

    const { data, isLoading, isError } = useTask(taskId);
    const { data: assignmentsData, isLoading: assignmentsLoading, isError: assignmentsError} = useTaskAssignmentsByTask(taskId);

    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
    const { mutate: acceptApplication, isPending: isAccepting } = useAcceptApplication();
    const { mutate: rejectApplication, isPending: isRejecting } = useRejectApplication();
    const { data: allUsersResponse, isLoading: usersLoading } = useAllUsers();

    const fetchedTask = data?.tasks ?? data?.task ?? data;
    const task = passedTask ?? fetchedTask;

    // applicants
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

    const pendingApplicants = assignees.filter(
        (applicant: any) => applicant.status !== "accepted"
    );

    const handleDeleteTask = () => {
        if (!taskId) return;

        deleteTask(taskId, {
            onSuccess: () => {
                navigation.navigate("MyTasksTab", {screen: "MyTasks"});
            },
            onError: (error: any) => {
                console.error("Error:", error);
                console.log("status:", error?.response?.status);
                console.log("data:", error?.response?.data);
                console.log("url:", error?.config?.url);
            },
        });
    };

    const handleAcceptApplicant = (userId: number) => {
        if (!taskId || !userId) return;

        acceptApplication(
            {taskId, userId},
            {
                onSuccess: () => {
                    navigation.navigate("MessagesTab", { screen: "ChatsScreen"});
                },
                onError: (error: any) => {
                    console.error("Error:", error);
                    console.log("status:", error?.response?.status);
                    console.log("data:", error?.response?.data);
                    console.log("url:", error?.config?.url);
                },
            }
        );
    };

    const handleRejectApplicant = (userId: number) => {
        if (!taskId || !userId) return;

        rejectApplication(
            {taskId, userId},
            {
                onError: (error: any) => {
                    console.error("Error:", error);
                },
            }
        );
    };

    if (isLoading || assignmentsLoading || usersLoading) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="Your Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
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
                <CustomHeader title="Your Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Could not load task.</Text>
                </View>
            </View>
        );
    }

    const imageSource = task.images ? { uri: Array.isArray(task.images) ? task.images[0] : task.images} : require("../../../assets/img/img.png");

    return (
        <View style={{flex:1}}>
            <CustomHeader title="Your Task" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            <ScrollView>
                <View style={styles.container}>
                    <Image source={imageSource} style={styles.taskImage} resizeMode="cover"/>
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text variant="titleLarge" style={styles.title}>{task.name}</Text>
                    
                    <Text style={{fontSize:20}}>{task.description}</Text>

                    <Text variant="bodyLarge" style={{ marginTop:7, marginBottom:7, textAlign:"left", alignSelf: 'flex-start'}}>Posted by:</Text>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <ProfileCard userId={task?.publisherID}/>
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
                            {pendingApplicants.length > 0 ? (
                                pendingApplicants.map((person: any) => {
                                    const assigneeId = Number(person.userID ?? person.assigneeID ?? person.id);

                                    return (
                                        <View key={String(person.userID)} style={{ width: "100%", marginBottom: 14}}>
                                            <ProfileCard userId={person.userID}/>
                                            
                                            <View style={{flexDirection: "row", gap:8, marginTop:8}}>
                                                <Button
                                                    icon="check"
                                                    mode="contained"
                                                    onPress={() => handleAcceptApplicant(Number(person.userID))}
                                                    loading={isAccepting}
                                                    disabled={isAccepting}
                                                    style={styles.btn}
                                                >Accept</Button>

                                                <Button
                                                    icon="close"
                                                    mode="outlined"
                                                    onPress={() => handleRejectApplicant(Number(person.userID))}
                                                    disabled={isRejecting}
                                                    style={styles.rejectBtn}
                                                >Reject</Button>
                                            </View>
                                        </View>
                                    );
                                })
                            ) : (<Text>No applicants yet.</Text>)}
                            
                        </View>

                    </View>
                    <View style={{flexDirection:'row',gap:5}}>
                        <Button 
                            icon="pencil-outline" 
                            mode="contained" 
                            onPress={() => navigation.navigate('MyTasksTab', { screen: 'EditTaskScreen', params: { taskId: task?.taskID, task } })} 
                            style={styles.btn} 
                            labelStyle={{fontSize:20, lineHeight:25}} 
                            contentStyle={{marginVertical:10}}>Edit</Button>
                        <Button 
                            icon="close" 
                            mode="contained" 
                            onPress={handleDeleteTask} 
                            style={styles.btn} 
                            labelStyle={{fontSize:20, lineHeight:25}} 
                            contentStyle={{marginVertical:10}}
                            loading={isDeleting}
                            disabled={isDeleting}>Remove</Button>
                    </View>

                </View>
            </ScrollView>
        </View>

    );
  }

