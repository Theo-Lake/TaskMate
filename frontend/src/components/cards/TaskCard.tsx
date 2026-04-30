import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar, Button } from 'react-native-paper';

// could also add tags for filter?
type TaskCardProps = {
  title: string;
  price: string;
  imageUrl: string;
  description?: string;
  onPress?: () => void;
  onRemove?: () => void;
};

export default function TaskCard({
  title,
  price,
  imageUrl,
  description,
  onPress,
  onRemove,
}: TaskCardProps) {
  const theme = useTheme();

  return (
    <Card mode="outlined" style={styles.card} onPress={onRemove ? undefined : onPress}>
      <View style={styles.row}>
        <Avatar.Icon size={50} icon="account" style={{backgroundColor:'#64A376', marginRight:10}} color="black"/>
        <View style={styles.content}>
          <Text variant="titleSmall" numberOfLines={1} style={{fontWeight: 'bold'}}>{title}</Text>
          {description ? (
            <Text variant="bodySmall" numberOfLines={2} style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
              {description}
            </Text>
          ) : null}
        </View>
        <Text variant="titleMedium" style={styles.price}>£{price}</Text>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      {onRemove && (
        <Button icon="close" mode="contained" onPress={onRemove} buttonColor="#cc0000" style={{margin: 8}} labelStyle={{fontSize: 16}}>
          Remove
        </Button>
      )}
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