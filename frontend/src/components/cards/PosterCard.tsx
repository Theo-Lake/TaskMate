import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';
import StarRating from '../StarRatingGroup/StarRatingGroup';
// could also add tags for filter?
type PosterCardProps = {
  // need avatar to link to user profile
  title: string;
  review: number;
  onPress?: () => void;

  // uri image from server
  // imageUrl: string;

};

export default function PosterCard({
  title,
  review,
  onPress,

}: PosterCardProps) {
  const theme = useTheme();

  return (
    <Card mode="outlined" style={styles.card} onPress={onPress}>
      <View style={styles.row}>

        <Avatar.Icon size={50} icon="account" style={{backgroundColor:'#64A376', marginRight:10}} color="black"/>

        <View style={styles.content}>

          <Text variant="titleSmall"  style={{fontWeight: 'bold',color:'black'}}>
            {title}
          </Text>
          <View  style={styles.review}>
            <StarRating rating={review}/>
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