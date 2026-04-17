import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image,FlatList } from 'react-native';
import {  Icon, IconButton, Text, TextInput, useTheme, Chip, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import StarRatingGroup from "../../components/StarRatingGroup/StarRatingGroup"
import { ScrollView } from "react-native";
import ReviewCard from "../../components/cards/ReviewCard";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../../hooks/useProfile";
import { useReceivedReviews } from "../../hooks/useReviews";
// hardcoded rewiews. Use for testing. in the future we'll grab from the server
/*
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
]*/

export default function UserProfileScreen({navigation}:any) {
  //gfetting userId 
    const [currentUSerId, setCurrentUserId] = useState<number | null>(null);
    useEffect(() => {
      const fetchId = async() =>{
        const storeId = await AsyncStorage.getItem('userId');
        console.log("ID  AsyncStorage:", storeId);
        if (storeId) setCurrentUserId(Number(storeId))
      }
    fetchId();
    }, []);
    //getting user:
    const { data: user, isLoading:profileLoading, isError, error } = useProfile(currentUSerId);
    const {data:reviews, isLoading: reviewsLoading} = useReceivedReviews(currentUSerId);


    //loading indicatior while fetching the data for the server:
    if (profileLoading || !currentUSerId){
      return(
        <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#3D8252" />
        </View>
      )
    }
    if (isError){
      return(
        <View style={styles.activityIndicator}>
          <Text style={{ color: 'red' }}>Error loading profile: {error?.message}. Try to restart</Text>
        </View>
      )
    }
    const name = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
    /*const name = "Jane Doe" /* TEmporary*/
    const reputation = 4.5
    return (
        <View style={{flex:1}}>
            
            <CustomHeader title="Your Profile" navigation={navigation}/>
            <View style={styles.topOfProfile}>
                <View style={styles.profilePic}>
                    <CustomerAvatar size={150} user={user}/>
                </View>
                <View style={styles.profileInfo}>
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text style={{fontSize:20,marginBottom:30}}>{name}</Text>
                    <Text style={{fontSize:20,marginBottom:30}}>@{user?.username}</Text>

                    <Text style={{fontSize:20}}>Reputation:</Text>
                    <StarRatingGroup rating={reputation}/>
                </View>
                <View style={styles.settingsButton}>
                    <IconButton size={34} icon='cog-outline' onPress={() => navigation.navigate('MyTasksTab', { screen: 'SettingsScreen' })}/>
                </View>
            </View>

            {/* Rewiews bellow: */}
            {reviewsLoading ? (
                    <ActivityIndicator color="#3D8252" />
                ) : (
                <View style={{flex:1}}>
                    <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.reviewID.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ReviewCard
                          title={item.title}
                          review={item.rating}
                          description={item.comment}
                          onPress={() => console.log('Opened rewiew', item.title)}
                        />
                    )}
                    ListEmptyComponent={() => (
                      <View style={{alignItems: 'center', marginTop: 50}}>
                          <Text style={{ color: 'gray' }}>No reviews received yet.</Text>
                      </View>
                  )}
                    />
            </View>
            )}
        </View>
    );
}

