import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {  Text, useTheme, TextInput, Checkbox,  Button, IconButton, Menu } from "react-native-paper";
import {styles} from "./styles"
import * as ImagePicker from 'expo-image-picker'
import CustomHeader from "../../components/navBar/CustomHeader";
import {TextInputMask} from 'react-native-masked-text'
import StarRatingGroupButtons from "../../components/StarRatingGroup/StarRatingGroupButtons";

import { useCreateReview } from "../../hooks/useReviews";
import { ReviewSchema } from "../../validation/schemas/reviews";

const numToRating: Record<number, string>={
    1: 'ONE',
    2: 'TWO',
    3:'THREE',
    4:'FOUR',
    5: 'FIVE'
}

export default function LeaveReviewScreen({route, navigation}:any) {

    const {assigneeId} = route.params;
    
    const [ReviewTitle, setReviewTitleText] = React.useState("");
    const [ReviewDesc, setReviewDesc] = React.useState("");

    const [rating, setRating] =useState<number>(1)
    const [comment, setComment] = useState('')
    const {mutate: submitReview, isPending} = useCreateReview();

    const handleSubbmit=()=>{
        const reviewData={
            name:ReviewTitle,
            comment: ReviewDesc,
            rating: numToRating[rating]
        };

        const validationResult = ReviewSchema.safeParse(reviewData);
        if (!validationResult.success){
            setErrors(validationResult.error.flatten().fieldErrors);
            return;
        }
        setErrors({});


        submitReview({
            assigneeId:Number(assigneeId),
            data: validationResult.data
        },{
            onSuccess:()=>{
                Alert.alert('Review submited!', 'Thank you for your feedback')
                navigation.goBack();
            }, 
            onError:(err:any)=>{
                console.error("Error:", err)
            }
        })
        
    }

    // errors
    const [errors, setErrors] = useState<any>({});


    return (
        <>
        <View>
            <CustomHeader title="Post Review" navigation={navigation} showBackArrow={true} showProfilePicture={false}/>
        </View>
        <View style={{flex:1}}>
            <ScrollView>
                <View style = {styles.content}>
                    <TextInput mode='outlined' label="Review title:" value={ReviewTitle} onChangeText={text => setReviewTitleText(text)} style={styles.textBox} error={!!errors.name}/>{errors.name && <Text style={{ color: "red" }}>{errors.name[0]}</Text>}
                    <TextInput mode='outlined'  label="Review comment:" value={ReviewDesc} onChangeText={text => setReviewDesc(text)} style={styles.textBoxTall} multiline={true} textAlignVertical="top" error={!!errors.description}/>{errors.description && <Text style={{ color: "red" }}>{errors.description[0]}</Text>}
                    <StarRatingGroupButtons rating={rating} setRating={setRating}/>
                    <Button icon="content-save-outline" mode="contained" onPress={handleSubbmit} style={{borderRadius:40, backgroundColor:'#3D8252'}} labelStyle={{fontSize:20, lineHeight:25}} contentStyle={{marginVertical:10}}>Save changes</Button>
                    
                </View>
            </ScrollView>
        </View>
        </>

    );
}

