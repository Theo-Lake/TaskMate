import React, { createContext, useContext, useEffect, useState } from "react";
import { getRefreshToken } from "../auth/auth";
import { registerSignOut } from "../auth/authState";

type AuthContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRefreshToken().then((token) => {
			setIsAuthenticated(!!token);
			setLoading(false);
		});

		registerSignOut(() => setIsAuthenticated(false));
	}, []);

	if (loading) return null;

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
