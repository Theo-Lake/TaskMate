/*#FIX: SOLVED navigation in opening tabs. Maybe switch to Stack*/
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import OpeningScreen from "./src/screens/OpeningScreen/OpeningScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import DevMenuScreen from "./src/screens/DevMenuScreen/DevMenuScreen";

import EmailConfirmationScreen from "./src/screens/EmailConfirmationScreen/EmailConfirmation";

import MainNavigationTabs from "./src/navigation/MainNavigationTab";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

{
	/* You can add some custom colors and use them if u need them*
!!! majority of colors used in design are already in MD3, so u can just use them without declearing   
  */
}
const customTheme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		buttonHeaderGreen: "#3D8252",
		softBlack: "#333333",
	},
};

function OpeningTabs() {
	return (
		<Stack.Navigator
			initialRouteName="Opening"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
			/>
			<Stack.Screen
				name="Opening"
				component={OpeningScreen}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUpScreen}
			/>

			<Stack.Screen
				name="EmailConfirmation"
				component={EmailConfirmationScreen}
				options={{gestureEnabled:false}}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
		<PaperProvider theme={customTheme}>
			<NavigationContainer>
				<StatusBar style="dark" />
				<Stack.Navigator
					initialRouteName="DevMenu"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen
						name="DevMenu"
						component={DevMenuScreen}
						options={{ title: "DevMenu" }}
					/>
					<Stack.Screen name="OpeningTabs" component={OpeningTabs} />
					<Stack.Screen
						name="MainApp"
						component={MainNavigationTabs}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
		</QueryClientProvider>
	);
}
