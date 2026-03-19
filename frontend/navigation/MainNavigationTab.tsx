//finish that!!!
/*
*/ 


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {CommonActions} from '@react-navigation/native'
import { BottomNavigation } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TasksScreen from '../screens/TasksScreen/Tasks';
import CreateTaskScreen from '../screens/CreateTaskScreen/CreateTaskScreen';
import ViewTaskScreen from '../screens/ViewTaskScreen/ViewTaskScreen';

import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

import MyTasksScreen from '../screens/MyTasksScreen/MyTasksScreen';
import ViewOwnTaskScreen from '../screens/ViewOwnTaskScreen/ViewOwnTaskScreen';

import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

import EventsScreen from '../screens/EventsScreen/EventsScreen';
import ViewEventScreen from '../screens/ViewEventScreen/ViewEventScreen';
import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen';





const Tab = createBottomTabNavigator();
const TasksStack = createNativeStackNavigator();
const MyTasksStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();

function TasksStackNavigator(){
    return (
        <TasksStack.Navigator screenOptions={{headerShown: false}}>
            <TasksStack.Screen name="Tasks" component={TasksScreen}/>
            <TasksStack.Screen name="CreateTask" component={CreateTaskScreen}/>
            <TasksStack.Screen name="ViewTaskScreen" component={ViewTaskScreen}/>
        </TasksStack.Navigator>
    );
}
function MyTasksStackNavigator(){
    return (
        <MyTasksStack.Navigator screenOptions={{headerShown: false}}>
            <MyTasksStack.Screen name="MyTasks" component={MyTasksScreen}/>
            <MyTasksStack.Screen name="CreateTask" component={CreateTaskScreen}/>
            <MyTasksStack.Screen name="ViewOwnTask" component={ViewOwnTaskScreen}/>
        </MyTasksStack.Navigator>
    );
}
function ChatsStackNavigator(){
    return (
        <ChatsStack.Navigator screenOptions={{headerShown: false}}>
            <ChatsStack.Screen name="ChatsScreen" component={ChatsScreen}/>
            <ChatsStack.Screen name="ChatScreen" component={ChatScreen}/>
        </ChatsStack.Navigator>
    );
}
function ProfileStackNavigator(){
    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}}>
            <ProfileStack.Screen name="UserProfileScreen" component={UserProfileScreen}/>
            <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen}/>

        </ProfileStack.Navigator>
    );
}
function EventsStackNavigator(){
    return (
        <EventsStack.Navigator screenOptions={{headerShown: false}}>
            <EventsStack.Screen name="EventsScreen" component={EventsScreen}/>
            <EventsStack.Screen name="ViewEventScreen" component={ViewEventScreen}/>
            <EventsStack.Screen name="CreateEventScreen" component={CreateEventScreen}/>
        </EventsStack.Navigator>
    );
}


export default function MainNavigationTabs(){
    return(
        <Tab.Navigator
            screenOptions={{headerShown: false}}
            tabBar={({navigation, state, descriptors, insets}) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}  
                    style={{backgroundColor: '#FFFFFF'}}
                    activeIndicatorStyle={{backgroundColor:"#2C5E3B"}}
                    onTabPress={({route, preventDefault}) =>{
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });
                        if (event.defaultPrevented) {
                            preventDefault();
                        }else{
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target:state.key,
                            });
                        }
                    }}
                    renderIcon={({route, focused, color}) => {
                        const {options} = descriptors[route.key];
                        if (options.tabBarIcon){
                            return options.tabBarIcon({focused, color, size:24});
                        }
                        return null;
                    }}
                    getLabelText={({route}) =>{
                        const { options} =descriptors[route.key];
                        return options.tabBarLabel as string ?? options.title ?? route.name;
                    }}
                />
            )}
        >
            <Tab.Screen
                name="TasksTab"
                component={TasksStackNavigator}
                options={{
                    tabBarLabel:'Tasks',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="front-hand" color={color} size={26}/>
                    ),
                }} 
            />
            <Tab.Screen
                name="EventsTab"
                component={EventsStackNavigator}
                options={{
                    tabBarLabel: 'Events',
                    tabBarIcon: ({color}) =><MaterialIcons name="person" color={color} size={26}/>
                }}
            />
            <Tab.Screen
                name="MessagesTab"
                component={ChatsStackNavigator}
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({color}) =><MaterialIcons name="chat-bubble" color={color} size={26}/>
                }}
            />
            <Tab.Screen
                name="MyTasksTab"
                component={MyTasksScreen}
                options={{
                    tabBarLabel: 'My Tasks',
                    tabBarIcon: ({color}) =><MaterialIcons name="favorite" color={color} size={26}/>
                }}
            />


        </Tab.Navigator>
    );
}

