import React from "react";
import { View, StyleSheet, Image,FlatList } from 'react-native';
import {  Icon, IconButton, Text, TextInput, useTheme, Chip } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import StarRatingGroup from "../../components/StarRatingGroup/StarRatingGroup"
import { ScrollView } from "react-native";
import ReviewCard from "../../components/cards/ReviewCard";


// hardcoded rewiews, in the future we'll grab from the server
const reviews = [
    {
      id: '1',
      title: 'Study buddy/Great',
      review:3.5,
      description: 'Helped me a lot with preparing for exams',
    },
    {
      id: '2',
      title: 'Referee/Excelent/Excelent',
      review:5,
      description: 'He awarded the victory to our team. What a great referee!',
    },
    {
        id: '3',
        title: 'Study buddy/Great',
        review:3.5,
        description: 'Helped me a lot with preparing for exams',
      },
      {
        id: '4',
        title: 'Referee/Excelent',
        review:5,
        description: 'He awarded the victory to our team. What a great referee!',
      },
      {
        id: '5',
        title: 'Study buddy/Great',
        review:3.5,
        description: 'Helped me a lot with preparing for exams',
      },
      {
        id: '6',
        title: 'Referee/Excelent',
        review:5,
        description: 'He awarded the victory to our team. What a great referee!',
      }
]

export default function UserProfileScreen({navigation}:any) {
    const name = "Jane Doe" /* TEmporary*/
    const reputation = 4.5
    return (
        <View style={{flex:1}}>
            
            <CustomHeader title="Your Profile" navigation={navigation}/>
            <View style={styles.topOfProfile}>
                <View style={styles.profilePic}>
                    <CustomerAvatar size={150} user={null}/>
                </View>
                <View style={styles.profileInfo}>
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text style={{fontSize:20,marginBottom:30}}>{name}</Text>
                    
                    <Text style={{fontSize:20}}>Reputation:</Text>
                    <StarRatingGroup rating={reputation}/>
                </View>
                <View style={styles.settingsButton}>
                    <IconButton size={34} icon='cog-outline' onPress={() => navigation.navigate('MyTasksTab', { screen: 'SettingsScreen' })}/>
                </View>
            </View>

            {/* Rewiews bellow: */}
            <View>
                
                </View>
                <View style={{flex:1}}>
                    <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ReviewCard
                        title={item.title}
                        review={item.review}
                        description={item.description}
                        onPress={() => console.log('Opened rewiew', item.title)}
                        />
                    )}
                    />
                </View>
            

            
            
        </View>
    );
}

