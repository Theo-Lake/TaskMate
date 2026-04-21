import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar, ActivityIndicator } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';
import StarRating from '../StarRatingGroup/StarRatingGroup';

import { useUser } from '../../hooks/useUsers';
import { useUserReviews} from "../../hooks/useReviews";
import CustomerAvatar from '../avatars/CustomerAvatars';

// could also add tags for filter?
type ProfileCardProps = {
  // need avatar to link to user profile
  userId: number | string | undefined;
  onPress?: () => void;

  // uri image from server
  // imageUrl: string;

};

export default function ProfileCard({
  userId,
  onPress,

}: ProfileCardProps) {
  const theme = useTheme();

  const {data: userResp, isLoading: userLoading} = useUser(userId);
  const {data: reviews, isLoading: reviewsLoading} = useUserReviews(userId);
  

  if (userLoading || reviewsLoading) {
    return (
        <View style={{flex:1}}>
            <View style={{marginTop:40, alignItems:"center"}}>
                <Text>Loading...</Text>
                <ActivityIndicator style={{marginTop:20}} size="large"/>
            </View>
        </View>
    );
}
  if (!userId){
    return null;
  }

  const user = userResp?.users?.user 
  const reputation = reviews && reviews.length > 0
  ? (reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / reviews.length).toFixed(1)
  : 0;

  return (
    <Card mode="outlined" style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={{marginRight:3}}>
          <CustomerAvatar size={50} user={user}/>

        </View>

        <View style={styles.content}>

          <Text variant="titleSmall"  style={{fontWeight: 'bold',color:'black'}}>
            {user?.username}
          </Text>
          <View  style={styles.review}>
            <StarRating rating={reputation}/>
          </View>

          
        </View>
        


      
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#C5C5C5',
    width:'100%',
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    width:'100%'
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 5,
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    marginTop: 4,
  },
  review: {
    // probably a better way to do this than a huge top margin
    marginRight: 10,
    marginLeft:0,
    fontWeight: 'bold',
  },
});