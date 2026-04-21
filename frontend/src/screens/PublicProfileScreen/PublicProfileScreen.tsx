import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image,FlatList } from 'react-native';
import {  Icon, IconButton, Text, TextInput, useTheme, Chip, ActivityIndicator, Button } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";
import CustomerAvatar from "../../components/avatars/CustomerAvatars";
import StarRatingGroup from "../../components/StarRatingGroup/StarRatingGroup"
import { ScrollView } from "react-native";
import ReviewCard from "../../components/cards/ReviewCard";

import { useUser } from "../../hooks/useUsers";
import { useUserReviews } from "../../hooks/useReviews";

export default function PublicProfileScreen({route, navigation}:any) {
  //gfetting userId 
    
    const {userId} = route.params;
    //getting user:
    const { data: respdata, isLoading:profileLoading, isError, error } = useUser(userId);
    const {data:reviews, isLoading: reviewsLoading} = useUserReviews(userId);
    const user = respdata?.users.user 

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
            
            <CustomHeader title="Profile" navigation={navigation} showBackArrow={true} showProfilePicture={true}/>
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
            </View>
            <View>
              <Button icon="star" mode="contained" onPress={() => navigation.navigate('LeaveReviewScreen')} style={{borderRadius:40, backgroundColor:'#3D8252', marginHorizontal:20}} labelStyle={{fontSize:16, lineHeight:25}} contentStyle={{marginVertical:10}}>Leave review</Button>
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

