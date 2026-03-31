import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';

// could also add tags for filter?
type NoticeCardProps = {
  // need avatar to link to user profile
  title: string;
  price: string;
  imageUrl: ImageSourcePropType;
  // uri image from server
  // imageUrl: string;
  description?: string;
  onPress?: () => void;
};

export default function NoticeCard({
  title,
  price,
  imageUrl,
  description,
  onPress,
}: NoticeCardProps) {
  const theme = useTheme();

  return (
    <Card mode="outlined" style={styles.card} onPress={onPress}>
        <Image source={imageUrl} style={styles.image} />

      <View style={styles.row}>

        <Avatar.Icon size={50} icon="account" style={{backgroundColor:'#64A376', marginRight:10}} color="black"/>

        <View style={styles.content}>

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

        <Text variant="titleMedium" style={styles.price}>
            {price}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginVertical: 6,
    borderRadius: 10,
    width:300,
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
    width: 100,
    height: 100,
    borderRadius: 5,
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    maxWidth:185,
  },
  description: {
    marginTop: 4,
  },
  price: {
    // probably a better way to do this than a huge top margin
    marginTop: 40,
    marginRight: 10,
    marginLeft:10,
    fontWeight: 'bold',
  },
});