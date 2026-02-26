import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DevMenuScreen from "./screens/DevMenuScreen";
import OpeningScreen from './screens/OpeningScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ChatsScreen from './screens/ChatsScreen';
import EventsScreen from './screens/EventsScreen';
import MyTasksScreen from './screens/MyTasksScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import ViewTaskScreen from './screens/ViewTaskScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function OpeningTabs(){
  return(
    <Tab.Navigator initialRouteName='Opening' screenOptions={{tabBarStyle : {display : 'none'},}}>
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
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="DevMenu" screenOptions={{headerStyle: {backgroundColor:'#3D824E'}, headerTintColor: 'white'}}>
          <Stack.Screen 
            name="DevMenu" 
            component={DevMenuScreen} 
            options={{ title: 'DevMenu' }} />

          <Stack.Screen name="OpeningTabs" component={OpeningTabs} />

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