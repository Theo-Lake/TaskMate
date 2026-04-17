import React, { createContext, useContext, useEffect, useState } from "react";
import { getRefreshToken, storeTokens, clearTokens } from "../auth/auth";
import { registerSignOut } from "../auth/authState";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AuthContextType = {
	isAuthenticated: boolean;
	login: (accessToken: string, refreshToken: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRefreshToken().then((token) => {
			setIsAuthenticated(!!token);
			setLoading(false);
		});

		registerSignOut(async () => {
			await clearTokens();
			setIsAuthenticated(false)	
		});
	}, []);
	const login = async(accessToken: string, refreshToken: string  )=> {
		await storeTokens(accessToken, refreshToken)
		setIsAuthenticated(true);
	}
	const logout = async()=> {
		await clearTokens();
		setIsAuthenticated(false);
	}

	if (loading) return null;

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context){
		throw new Error("use useUAuth only within AuthProv")
	}
	return context;
}
	

