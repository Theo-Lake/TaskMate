// basically the same as taskcard but with time instead of price and no img(?)

import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';

type EventCardProps = {
  // need avatar to link to user profile
  title: string;
  time: string;
  date: string;
  imageUrl: ImageSourcePropType;
  // uri image from server
  // imageUrl: string;
  description?: string;
  onPress?: () => void;
};

export default function EventCard({
  title,
  time,
  date,
  imageUrl,
  description,
  onPress,
}: EventCardProps) {
  const theme = useTheme();

  return (
    <Card mode="outlined" style={styles.card} onPress={onPress}>
      <View style={[styles.row, {flex:1}]}>

        <Avatar.Icon size={50} icon="account" style={{backgroundColor:'#64A376', marginRight:10}} color="black"/>

        <View style={[styles.content, {flex:1}]}>

          <Text variant="titleSmall" numberOfLines={1} style={{fontWeight: 'bold'}}>
            {title}
          </Text>
          
          {description ? (
            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
            >
              {description}
            </Text>
          ) : null}
          
        </View>
        <View>
            {/* <Text variant="titleMedium" style={styles.time}>
                {time}
            </Text> */}
            <Text variant="titleMedium" style={styles.date}>
                {date}
            </Text>
        </View>

        {/* use uri for server hosted images */}
        {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}

        {/* <Image source={imageUrl} style={styles.image} /> */}
      
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#C5C5C5',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
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
  time: {
    // probably a better way to do this than a huge top margin
    marginTop: 30,
    marginRight: 10,
    marginLeft:10,
    fontWeight: 'bold',
  },
  date: {
    marginRight: 10,
    marginLeft:10,
    fontWeight: 'bold',
  }
});