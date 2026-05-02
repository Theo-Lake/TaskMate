import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AccessibilityContextType={
    isLargeText: boolean;
    toggleLargeText: () => void
    fontMultiplier: number;// 1 for same font
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({children} : {children: React.ReactNode}) => {
    const [isLargeText, setIsLargeText] = useState(false)

    useEffect(() => {
        const loadSettings = async() =>{
            const savedSetting = await AsyncStorage.getItem('isLargeText');
            if (savedSetting !== null){
                setIsLargeText(JSON.parse(savedSetting));
            }
        }
        loadSettings();
    }, []);
    const toggleLargeText= async()=>{
        const newValue = !isLargeText;
        setIsLargeText(newValue);
        await AsyncStorage.setItem('isLargeText', JSON.stringify(newValue))
    }
    const fontMultiplier = isLargeText ? 1.2 : 1.0

    return (
        <AccessibilityContext.Provider value={{ isLargeText, toggleLargeText, fontMultiplier}}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export const useAccessibility= () =>{
    const context = useContext(AccessibilityContext);
    if (!context){
        throw new Error("Accessibilty error")
    }
    return context;
}