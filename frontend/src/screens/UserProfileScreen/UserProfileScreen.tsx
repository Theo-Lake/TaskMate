import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image,FlatList, Alert } from 'react-native';
import {  Icon, IconButton, Text, Button,  ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import StarRatingGroup from "../../components/StarRatingGroup/StarRatingGroup"
import { ScrollView } from "react-native";
import ReviewCard from "../../components/cards/ReviewCard";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useCurrentUser } from "../../hooks/useUsers";
import { useAuth } from "../../context/AuthContext";

import { useMyReceivedReviews } from "../../hooks/useReviews";
import { logout } from "../../api/auth";
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

  
  const handleLogout= async () => {
    Alert.alert(
        "Log out",
        "Do you want to log out?",
        [
            {text: "Cancel", style:'cancel'},
            {
                text:'Log Out', 
                style: "destructive",
                onPress: async()=>{
                    try{
                        await AsyncStorage.removeItem('myID')
                        await logout();
                    } catch (error){
                        Alert.alert("Errorr", "Failed to log out")
                    }
                }
            }
        ]
    )
 }

    //getting user:
    const { data: respdata, isLoading:profileLoading, isError, error } = useCurrentUser();
    const {data:reviews, isLoading: reviewsLoading} = useMyReceivedReviews();
    const user = respdata?.users?.user 

    //loading indicatior while fetching the data for the server:
    if (profileLoading){
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
          <Button icon="logout" mode="contained" onPress={handleLogout} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:16, lineHeight:25}} contentStyle={{marginVertical:10}}>Log out</Button>

        </View>
      )
    }
    const name = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
    /*const name = "Jane Doe" /* TEmporary*/
    const reputation = reviews && reviews.length > 0
      ? (reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / reviews.length).toFixed(1)
      : 0;
    return (
        <View style={{flex:1}}>
            
            <CustomHeader title="Your Profile" navigation={navigation}/>
            <View style={styles.topOfProfile}>
                <View style={styles.profilePic}>
                    <CustomerAvatar size={150} user={user}/>
                </View>
                <View style={styles.profileInfo}>
                    {/*<TextInput mode="flat" underlineColor="tran" value="use" editable={false} style={styles.textBox}/>*/}
                    <Text style={{fontSize:25,marginBottom:10}}>{name}</Text>
                    <Text style={{fontSize:15,marginBottom:10}}>@{user?.username}</Text>

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
                          title={item.name}
                          review={item.rating}
                          description={item.comment}
                          onPress={() => {navigation.navigate('ViewReviewScreen', {reviewID: item?.reviewID})}}
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

