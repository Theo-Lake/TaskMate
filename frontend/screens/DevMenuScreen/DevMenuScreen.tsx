import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function DevMenuScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Deveoper navigation
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auth </Text>
        <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('OpeningTabs')}>Opening Screen</Button>
        <Button mode="outlined" style={styles.btn} onPress={() => navigation.navigate('OpeningTabs', {screen:'Login'})}> Login</Button>
        <Button mode="outlined" style={styles.btn} onPress={() => navigation.navigate('OpeningTabs', {screen:'SignUp'})}> SignUp</Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main </Text>
        <Button mode="contained-tonal" style={styles.btn} onPress={() => navigation.navigate('Home')}>Home</Button>
        <Button mode="contained-tonal" style={styles.btn} onPress={() => navigation.navigate('UserProfile')}>User Profile</Button>
        <Button mode="contained-tonal" style={styles.btn} onPress={() => navigation.navigate('Chats')}>Chats</Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasks & Events </Text>
        <Button mode="elevated" style={styles.btn} onPress={() => navigation.navigate('MyTasks')}>My Tasks</Button>
        <Button mode="elevated" style={styles.btn} onPress={() => navigation.navigate('CreateTask')}>Create Task</Button>
        <Button mode="elevated" style={styles.btn} onPress={() => navigation.navigate('ViewTask')}>View Task</Button>
        <Button mode="elevated" style={styles.btn} onPress={() => navigation.navigate('Events')}>Events</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'gray',
    marginBottom: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btn: {
    marginBottom: 10,
  }
});