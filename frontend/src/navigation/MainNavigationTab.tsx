
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {CommonActions} from '@react-navigation/native'
import { BottomNavigation, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAccessibility } from "../context/AccessibilityContext";
import TasksScreen from '../screens/TasksScreen/Tasks';
import CreateTaskScreen from '../screens/CreateTaskScreen/CreateTaskScreen';
import ViewTaskScreen from '../screens/ViewTaskScreen/ViewTaskScreen';

import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ResetPasswordScreen from "../screens/ResetPasswordScreen/ResetPasswordScreen";
import CardDetailsScreen from "../screens/CardDetailsScreen/CardDetailsScreen";
import AccessibilityScreen from "../screens/AccessibilityScreen/AccessibilityScreen";

import MyTasksScreen from '../screens/MyTasksScreen/MyTasksScreen';
import ViewOwnTaskScreen from '../screens/ViewOwnTaskScreen/ViewOwnTaskScreen';

import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

import EventsScreen from '../screens/EventsScreen/EventsScreen';
import ViewEventScreen from '../screens/ViewEventScreen/ViewEventScreen';
import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen';

import EditTaskScreen from "../screens/EditTask/EditTaskScreen";
import PublicProfileScreen from "../screens/PublicProfileScreen/PublicProfileScreen";

import ViewReviewScreen from "../screens/ViewReviewScreen/ViewReviewScreen";
import LeaveReviewScreen from "../screens/LeaveReviewScreen/LeaveReviewScreen";

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
            <TasksStack.Screen name="ViewTaskScreen" component={ViewTaskScreen}/>
            <TasksStack.Screen name="CreateTaskScreen" component={CreateTaskScreen}/>
            <TasksStack.Screen name="ViewReviewScreen" component={ViewReviewScreen}/>
            <MyTasksStack.Screen name="LeaveReviewScreen" component={LeaveReviewScreen}/>
            <TasksStack.Screen name="PublicProfileScreen" component={PublicProfileScreen}/>
        </TasksStack.Navigator>
    );
}
function MyTasksStackNavigator(){
    return (
        <MyTasksStack.Navigator screenOptions={{headerShown: false}}>
            <MyTasksStack.Screen name="MyTasks" component={MyTasksScreen}/>
            <MyTasksStack.Screen name="ViewOwnTask" component={ViewOwnTaskScreen}/>
            <MyTasksStack.Screen name="EditTaskScreen" component={EditTaskScreen}/>
            <MyTasksStack.Screen name="UserProfileScreen" component={UserProfileScreen}/>
            <MyTasksStack.Screen name="SettingsScreen" component={SettingsScreen}/>
            <MyTasksStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
            <MyTasksStack.Screen name="ViewReviewScreen" component={ViewReviewScreen}/>
            <MyTasksStack.Screen name="LeaveReviewScreen" component={LeaveReviewScreen}/>
            <MyTasksStack.Screen name="PublicProfileScreen" component={PublicProfileScreen}/>
            <MyTasksStack.Screen name="CardDetailsScreen" component={CardDetailsScreen}/>
            <MyTasksStack.Screen name="AccessibilityScreen" component={AccessibilityScreen}/>
            
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
//Save it for later


function EventsStackNavigator(){
    return (
        <EventsStack.Navigator screenOptions={{headerShown: false}}>
            <EventsStack.Screen name="EventsScreen" component={EventsScreen}/>
            <EventsStack.Screen name="ViewEventScreen" component={ViewEventScreen}/>
            <EventsStack.Screen name="CreateEventScreen" component={CreateEventScreen}/>
            <EventsStack.Screen name="ViewReviewScreen" component={ViewReviewScreen}/>
            <EventsStack.Screen name="PublicProfileScreen" component={PublicProfileScreen}/>
            <MyTasksStack.Screen name="LeaveReviewScreen" component={LeaveReviewScreen}/>
        </EventsStack.Navigator>
    );
}


export default function MainNavigationTabs(){
    const {fontMultiplier} = useAccessibility();
    return(
        
        <Tab.Navigator
            screenOptions={{headerShown: false}}
            tabBar={({navigation, state, descriptors, insets}) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}  
                    style={{backgroundColor: '#FFFFFF'}}
                    activeIndicatorStyle={{backgroundColor:"transparent"}}
                    activeColor="#2C5E3C"
                    inactiveColor="#49454F"
                    onTabPress={({route, preventDefault}) =>{
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });
                        if (!event.defaultPrevented) {
                            const startScreens = {
                                TasksTab: 'Tasks', 
                                EventsTab: 'EventsScreen',
                                MessagesTab: 'ChatsScreen',
                                MyTasksTab: 'MyTasks'
                            };
                            navigation.navigate(route.name, { screen: startScreens[route.name] });
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
                    renderLabel={({route, focused, color})=>{
                        const {options}= descriptors[route.key]
                        const label = options.tabBarLabel as string ?? options.title ?? route.name;
                        return(
                            <Text
                                style={{
                                    color:color,
                                    textAlign: 'center',
                                    fontSize: 11 * fontMultiplier,
                                    marginTop: 0,
                                    marginBottom:3
                                }}
                                numberOfLines={1}
                            >
                                {label}
                            </Text>
                        )
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
                component={MyTasksStackNavigator}
                options={{
                    tabBarLabel: 'My Tasks',
                    tabBarIcon: ({color}) =><MaterialIcons name="favorite" color={color} size={26}/>
                }}
            />

            


        </Tab.Navigator>
    );
}

