import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';

type ChatCardProps = {
  name: string;
  message: string;
  onPress?: () => void;
};

export default function ChatCard({
  name,
  message,
  onPress,
}: ChatCardProps) {
  const theme = useTheme();

  return (
    <Card mode="outlined" style={styles.card} onPress={onPress}>
      <View style={styles.row}>

        <Avatar.Icon size={50} icon="account" style={{backgroundColor:'#64A376', marginRight:10}} color="black"/>

        <View style={styles.content}>

          <Text variant="titleSmall" numberOfLines={1} style={{fontWeight: 'bold'}}>
            {name}
          </Text>
          
          {message ? (
            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
            >
              {message}
            </Text>
          ) : null}
          
        </View>
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
  price: {
    // probably a better way to do this than a huge top margin
    marginTop: 40,
    marginRight: 10,
    marginLeft:10,
    fontWeight: 'bold',
  },
});