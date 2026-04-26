import React from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip,Button, IconButton, ActivityIndicator } from "react-native-paper";
import {styles} from "./styles"
import CustomHeader from "../../components/navBar/CustomHeader";

import ProfileCard from "../../components/cards/ProfileCard";

import { useReview} from "../../hooks/useReviews";
import StarRating from "../../components/StarRatingGroup/StarRatingGroup";
import { useUser } from "../../hooks/useUsers";


export default function ViewReviewScreen({navigation, route}:any) {
    const {reviewID} = route.params;

    const { data: reviewData, isLoading: reviewLoading, isError: reviewError } = useReview(reviewID);

    const reviewPublisherID = reviewData?.reviewPublisherID
    const reviewAssigneeID = reviewData?.reviewAssigneeID



    if (reviewLoading) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Review" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Loading review...</Text>
                    <ActivityIndicator style={{marginTop:20}} size="large"/>
                </View>
            </View>
        );
    }

    if (reviewError || !reviewData) {
        return (
            <View style={{flex:1}}>
                <CustomHeader title="View Review" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
                <View style={{marginTop:40, alignItems:"center"}}>
                    <Text>Could not load review.</Text>
                </View>
            </View>
        );
    }

    const {   name, comment, rating, created_at } = reviewData;


    return (
        <View style={{flex:1}}>
            <CustomHeader title="View Review" navigation={navigation} showBackArrow={true} showProfilePicture={true} />
            <ScrollView>
                <View style={styles.container}>
                    <Text variant="titleLarge" style={styles.title}>{name}</Text>
                    <StarRating rating={rating}/>

                    {/*<View style={{alignItems:'flex-start',width:'100%'}}>
                        <ProfileCard 
                            userId={reviewAssigneeID}
                            onPress={() => navigation.navigate('PublicProfileScreen', {userId: reviewAssigneeID})}
                            />
                    </View>*/}

                    
                    
                    <Text style={{fontSize:20}}>{comment}</Text>

                    <Text variant="bodyLarge" style={{ marginTop:7, marginBottom:7, textAlign:"left", alignSelf: 'flex-start'}}>Posted by:</Text>
                    <View style={{alignItems:'flex-start',width:'100%'}}>
                        <ProfileCard 
                            userId={reviewPublisherID}
                            onPress={() => navigation.navigate('PublicProfileScreen', {userId: reviewPublisherID})}

                            />
                    </View>




                </View>
            </ScrollView>
        </View>

    );
  }

