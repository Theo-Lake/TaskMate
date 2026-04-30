import React, { useMemo, useState } from "react";
import { View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip, Button, ActivityIndicator } from "react-native-paper";
import {styles} from "../MyTasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import TaskCard from "../../components/cards/TaskCard";
import { FAB } from 'react-native-paper';

// import logic
import { useAllTasks, useAllTasksByUser, useTaskAssignmentsByUser, useDeleteTask } from "../../hooks/useTasks";
import { useCurrentUser } from "../../hooks/useUsers";

// used for memo
type DisplayTask = {
    id: string;
    title: string;
    price: string;
    description: string;
    imageUrl: any;
    category: string;
    rawTask: any;
};

type TaskStatus = "published" | "assigned";

export default function MyTasksScreen({navigation}:any) {

    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("published");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { mutate: deleteTask } = useDeleteTask();

    // grab current user
    const { data: currentUserResponse, isLoading: currentUserLoading, isError: currentUserError } = useCurrentUser();
    const currentUser = currentUserResponse?.users?.user ?? currentUserResponse?.user ?? currentUserResponse;
    const currentUserId = Number(currentUser?.userID);

    // fetch tasks made by user and assigned tasks
    const { data: publishedData, isLoading: publishedLoading, isError: publishedError } = useAllTasksByUser(currentUserId);
    const { data: assignmentsData, isLoading: assignmentsLoading, isError: assignmentsError } = useTaskAssignmentsByUser(currentUserId);
    
    // fetch tasks
    const { data: allTasksData, isLoading: allTasksLoading, isError: allTasksError } = useAllTasks();

    const publishedTasksRaw = Array.isArray(publishedData?.tasks) ? publishedData.tasks : Array.isArray(publishedData) ? publishedData : [];
    const assignmentRows = Array.isArray(assignmentsData?.taskAssignment) ? assignmentsData.taskAssignment : Array.isArray(assignmentsData) ? assignmentsData : [];
    const allTasksRaw = Array.isArray(allTasksData?.tasks) ? allTasksData.tasks : Array.isArray(allTasksData) ? allTasksData : [];

    const assignmentStatusMap = useMemo(() => {
        const map = new Map<number, string>();
        assignmentRows.forEach((a: any) => map.set(Number(a.taskID), a.status ?? "pending"));
        return map;
    }, [assignmentRows]);

    const assignedTasksRaw = useMemo(() => {
        return allTasksRaw.filter((task: any) => assignmentStatusMap.has(Number(task.taskID)));
    }, [allTasksRaw, assignmentStatusMap]);

    // map tasks
    const mappedTasks = (tasks: any[]): DisplayTask[] => {
        return tasks.map((task: any) => ({
            id: String(task.taskID),
            title: task.name,
            price: task.payment,
            description: task.description,
            imageUrl: task.images ? (Array.isArray(task.images) ? task.images[0] : task.images) : require("../../../assets/img/img.png"),
            category: task.type,
            rawTask: task,
        }));
    };

    const publishedTasks = useMemo(() => mappedTasks(publishedTasksRaw), [publishedTasksRaw]);
    const assignedTasks = useMemo(() => mappedTasks(assignedTasksRaw), [assignedTasksRaw]);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const visibleTasks = useMemo(() => {
        const baseTasks = selectedStatus === "published" ? publishedTasks : assignedTasks;
        if (selectedCategory === "all") return baseTasks;
        return baseTasks.filter((task) => task.category === selectedCategory);
    }, [selectedStatus, selectedCategory, publishedTasks, assignedTasks]);

    const acceptedTasks = useMemo(() => {
        return visibleTasks.filter((task) => assignmentStatusMap.get(Number(task.id)) === "accepted");
    }, [visibleTasks, assignmentStatusMap]);

    const pendingTasks = useMemo(() => {
        return visibleTasks.filter((task) => assignmentStatusMap.get(Number(task.id)) !== "accepted");
    }, [visibleTasks, assignmentStatusMap]);

    // category filter toggle
    const handleCategoryPress = (category: string) => {
        setSelectedCategory((prev) => (prev === category ? "all" : category));
    };

    const onTaskPress = (task: DisplayTask) => {
        if (selectedStatus === "published") {
            navigation.navigate("ViewOwnTask", {taskId: Number(task.id), task: task.rawTask});
        }
        else {
            navigation.navigate("TasksTab", {screen: "ViewTaskScreen", params: {taskId: Number(task.id), task: task.rawTask, fromMyTasks: true}});
        }
    };

    // loading
    if (currentUserLoading || publishedLoading || assignmentsLoading || allTasksLoading) {
        return (
            <>
            <View>
                <CustomHeader title="My Tasks" navigation={navigation} showProfilePicture={true} />
            </View>
            <View style={{alignItems:'center', marginTop:20}}>
                <Text>Loading tasks...</Text>
                <ActivityIndicator size="large" style={{marginTop:20}}/>
            </View>
            </>
        )
    }

    // error
    if (currentUserError || publishedError || assignmentsError || allTasksError) {
        return (
            <>
            <View>
                <CustomHeader title="My Tasks" navigation={navigation} showProfilePicture={true} />
            </View>
            <View style={{alignItems:'center', marginTop:20}}>
                <Text>Something went wrong loading the tasks!</Text>
                <ActivityIndicator size="large" style={{marginTop:20}}/>
            </View>
            </>
        )
    }

    return (
        <View style={{flex:1}}>
        <View>
            <CustomHeader title="My Tasks" navigation={navigation} showProfilePicture={true}/>
        </View>

        <View style={{flex:1}}>

            <View style={{flexDirection: 'row', marginTop:10, marginHorizontal:6}}>
                <Button 
                    style={[styles.button, selectedStatus === "published" ? styles.activeButton : styles.inactiveButton]} 
                    mode={selectedStatus === "published" ? "contained" : "outlined"} 
                    icon="star"
                    textColor="#ffffff"
                    onPress={() => setSelectedStatus("published")}
                    >Published
                </Button>
                <Button 
                    style={[styles.button, selectedStatus === "assigned" ? styles.activeButton : styles.inactiveButton]} 
                    mode={selectedStatus === "assigned" ? "contained" : "outlined"} 
                    icon="check" 
                    textColor="#ffffff"
                    onPress={() => setSelectedStatus("assigned")}
                    >Assigned
                </Button>
            </View>

            <View style={{flexDirection: 'row'}}>
            {/* could turn into a component for reuse in events screen */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}} stickyHeaderIndices={[1]}>
                <View style={[styles.chip, {marginLeft:10}]}>
                    <Chip
                        mode="outlined"
                        selected={selectedCategory === "tutoring"}
                        showSelectedCheck={false}
                        style={{backgroundColor: selectedCategory === "tutoring" ? "#d0d0d0" : "#fffbff"}}
                        onPress={() => handleCategoryPress("tutoring")}>
                        Tutoring
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip
                        mode="outlined"
                        selected={selectedCategory === "delivery"}
                        showSelectedCheck={false}
                        style={{backgroundColor: selectedCategory === "delivery" ? "#d0d0d0" : "#fffbff"}}
                        onPress={() => handleCategoryPress("delivery")}>
                        Delivery
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip
                        mode="outlined"
                        selected={selectedCategory === "freelance"}
                        showSelectedCheck={false}
                        style={{backgroundColor: selectedCategory === "freelance" ? "#d0d0d0" : "#fffbff"}}
                        onPress={() => handleCategoryPress("freelance")}>
                        Freelance
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip
                        mode="outlined"
                        selected={selectedCategory === "tech_support"}
                        showSelectedCheck={false}
                        style={{backgroundColor: selectedCategory === "tech_support" ? "#d0d0d0" : "#fffbff"}}
                        onPress={() => handleCategoryPress("tech_support")}>
                        Tech support
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip
                        mode="outlined"
                        selected={selectedCategory === "general"}
                        showSelectedCheck={false}
                        style={{backgroundColor: selectedCategory === "general" ? "#d0d0d0" : "#fffbff"}}
                        onPress={() => handleCategoryPress("general")}>
                        General
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip
                        mode="outlined"
                        selected={selectedCategory === "other"}
                        showSelectedCheck={false}
                        style={{backgroundColor: selectedCategory === "other" ? "#d0d0d0" : "#fffbff"}}
                        onPress={() => handleCategoryPress("other")}>
                        Other
                    </Chip>
                </View>
            </ScrollView>
            </View>
                <View style={{flex:1}}>
                {selectedStatus === "published" ? (
                    <FlatList
                        data={(() => {
                            const completed = visibleTasks.filter(t => t.rawTask.status === "complete");
                            const notCompleted = visibleTasks.filter(t => t.rawTask.status !== "complete");
                            const inProgress = notCompleted.filter(t => t.rawTask.status === "in_Progress");
                            const notInProgress = notCompleted.filter(t => t.rawTask.status !== "in_Progress");
                            const active = notInProgress.filter(t => new Date(t.rawTask.dueDate) > oneDayAgo);
                            const pastDue = notInProgress.filter(t => new Date(t.rawTask.dueDate) <= oneDayAgo);
                            return [
                                ...active,
                                ...(inProgress.length > 0 ? [{ id: "__divider_inprogress__", isDivider: true, label: "In progress" } as any] : []),
                                ...inProgress,
                                ...(pastDue.length > 0 ? [{ id: "__divider_past__", isDivider: true, label: "Past due date" } as any] : []),
                                ...pastDue,
                                ...(completed.length > 0 ? [{ id: "__divider_complete__", isDivider: true, label: "Completed" } as any] : []),
                                ...completed.map(t => ({ ...t, isCompleted: true })),
                            ];
                        })()}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            if (item.isDivider) {
                                return (
                                    <View style={{marginVertical: 12, alignItems: "center"}}>
                                        <Text style={{color: "black", marginBottom: 8}}>{item.label}</Text>
                                        <View style={{height: 1, backgroundColor: "#c0c0c0", width: "100%"}} />
                                    </View>
                                );
                            }
                            return (
                                <TaskCard
                                    title={item.title}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    description={item.description}
                                    onPress={item.isCompleted ? undefined : () => onTaskPress(item)}
                                    onRemove={item.isCompleted ? () => deleteTask(Number(item.id)) : undefined}
                                />
                            );
                        }}
                        ListEmptyComponent={
                            <View style={{alignItems: "center", marginTop: 20}}>
                                <Text>You haven't published any tasks yet.</Text>
                            </View>
                        }
                    />
                ) : (
                    <FlatList
                        data={[
                            ...acceptedTasks,
                            ...(pendingTasks.length > 0 ? [{ id: "__divider__", isDivider: true } as any] : []),
                            ...pendingTasks,
                        ]}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            if (item.isDivider) {
                                return (
                                    <View style={{marginVertical: 12, alignItems: "center"}}>
                                        <Text style={{color: "black", marginBottom: 8}}>Waiting for approval</Text>
                                        <View style={{height: 1, backgroundColor: "#c0c0c0", width: "100%"}} />
                                    </View>
                                );
                            }
                            return (
                                <TaskCard
                                    title={item.title}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    description={item.description}
                                    onPress={() => onTaskPress(item)}
                                />
                            );
                        }}
                        ListEmptyComponent={
                            <View style={{alignItems: "center", marginTop: 20}}>
                                <Text>You haven't been assigned to any tasks yet.</Text>
                            </View>
                        }
                    />
                )}
                </View>

                <FAB
                    icon="plus"
                    style={styles.fab}
                    customSize={75}
                    color="white"
                    onPress={() => navigation.navigate('TasksTab', { screen: 'CreateTaskScreen' })}
                />
    
            </View>
        </View>
    );
  }

