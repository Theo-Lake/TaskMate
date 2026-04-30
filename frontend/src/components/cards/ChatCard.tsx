import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Avatar } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';

type ChatCardProps = {
  name: string;
  message: string;
  taskName?: string;
  role?: "Publisher" | "Assignee";
  onPress?: () => void;
};

export default function ChatCard({
  name,
  message,
  taskName,
  role,
  onPress,
}: ChatCardProps) {
  const theme = useTheme();

  const roleColor = role === "Publisher" ? "#4A90D9" : "#64A376";

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
              numberOfLines={1}
              style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
            >
              {message}
            </Text>
          ) : null}
        </View>

        {(role || taskName) && (
          <View style={styles.meta}>
            {role && (
              <View style={[styles.badge, { backgroundColor: roleColor }]}>
                <Text style={styles.badgeText}>{role}</Text>
              </View>
            )}
            {taskName && (
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.taskName}>{taskName}</Text>
            )}
          </View>
        )}

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
    marginTop: 40,
    marginRight: 10,
    marginLeft:10,
    fontWeight: 'bold',
  },
  meta: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 8,
    maxWidth: 100,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  taskName: {
    fontSize: 11,
    color: '#666',
    textAlign: 'right',
  },
});