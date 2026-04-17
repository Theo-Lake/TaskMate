import React from "react";
import { View, Image } from 'react-native';
import { Text, useTheme, Button } from "react-native-paper";
import { styles } from "./styles";

export default function OpeningScreen({ navigation } : any){
    const theme = useTheme();
    
    return(
        <View style={styles.container}>
            <Image source={require('../../../assets/img/logoNoText.png')} style={styles.logo} resizeMode="contain"/>
            
            <Text variant="displaySmall" style={[styles.title, {color: theme.colors.softBlack}]}> 
                Welcome to TaskMate!
            </Text>
            
            <View style={{flexDirection: 'row', gap: 5, width: '100%', paddingHorizontal: 20}}>
                <Button 
                    icon="check" 
                    mode="contained" 
                    onPress={() => navigation.navigate('Login')} 
                    style={styles.btn} 
                    labelStyle={{fontSize:20, lineHeight:25}} 
                    contentStyle={{marginVertical:10}}
                >
                    Log In
                </Button>
                
                <Button 
                    icon="message-text-outline" 
                    mode="contained" 
                    onPress={() => navigation.navigate('SignUp')} 
                    style={styles.btn} 
                    labelStyle={{fontSize:20, lineHeight:25}} 
                    contentStyle={{marginVertical:10}}
                >
                    Sign Up
                </Button>
            </View>
        </View>
    );
}