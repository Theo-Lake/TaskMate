import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import DevMenuScreen from "./screens/DevMenuScreen/DevMenuScreen";
import OpeningScreen from './screens/OpeningScreen/OpeningScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import HomeScreen from './screens/TasksScreen/Tasks';
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen';
import ChatsScreen from './screens/ChatsScreen/ChatsScreen';
import EventsScreen from './screens/EventsScreen/EventsScreen';
import MyTasksScreen from './screens/SettingsScreen/SettingsScreen';
import CreateTaskScreen from './screens/CreateTaskScreen/CreateTaskScreen';
import ViewTaskScreen from './screens/ViewTaskScreen/ViewTaskScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

{/* You can add some custom colors and use them if u need them*
!!! majority of colors used in design are already in MD3, so u can just use them without declearing   
  */}
  const customTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
        buttonHeaderGreen: '#3D8252',
        softBlack: '#333333'
    },
  };

function OpeningTabs(){
  return(
    <Tab.Navigator initialRouteName='Opening' tabBar={()=>null} screenOptions={{tabBarStyle : {display : 'none'}, }}>
      <Tab.Screen name='Login' component={LoginScreen}/>
      <Tab.Screen name='Opening' component={OpeningScreen}/>
      <Tab.Screen name='SignUp' component={SignUpScreen}/>
    </Tab.Navigator>
    
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="DevMenu" screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="DevMenu" 
            component={DevMenuScreen} 
            options={{ title: 'DevMenu' }} />

          <Stack.Screen name="OpeningTabs" component={OpeningTabs} options={{headerShown : false}}/>

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="Chats" component={ChatsScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="MyTasks" component={MyTasksScreen} />
          <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
          <Stack.Screen name="ViewTask" component={ViewTaskScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}