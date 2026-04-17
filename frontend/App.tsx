/*#FIX: SOLVED navigation in opening tabs. Maybe switch to Stack*/
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

const queryClient = new QueryClient();

import OpeningScreen from "./src/screens/OpeningScreen/OpeningScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import DevMenuScreen from "./src/screens/DevMenuScreen/DevMenuScreen";
import EmailConfirmationScreen from "./src/screens/EmailConfirmationScreen/EmailConfirmation";
import MainNavigationTabs from "./src/navigation/MainNavigationTab";

const Stack = createNativeStackNavigator();

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
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Opening" component={OpeningScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen
				name="EmailConfirmation"
				component={EmailConfirmationScreen}
				options={{ gestureEnabled: false }}
			/>
		</Stack.Navigator>
	);
}

function RootNavigator() {
	const { isAuthenticated } = useAuth();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isAuthenticated ? (
				<Stack.Screen name="MainApp" component={MainNavigationTabs} />
			) : (
				<Stack.Screen name="OpeningTabs" component={OpeningTabs} />
			)}
			<Stack.Screen name="DevMenu" component={DevMenuScreen} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={customTheme}>
				<AuthProvider>
					<NavigationContainer>
						<StatusBar style="dark" />
						<RootNavigator />
					</NavigationContainer>
				</AuthProvider>
			</PaperProvider>
		</QueryClientProvider>
	);
}
