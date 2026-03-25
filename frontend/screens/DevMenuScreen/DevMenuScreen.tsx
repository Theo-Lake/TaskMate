import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import {styles} from "./styles"

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
        <Text style={styles.sectionTitle}>Main. Acces to other pages through bottom menu</Text>
        <Button mode="contained-tonal" style={styles.btn} onPress={() => navigation.navigate('MainApp', {screen: 'TasksTab'})}>Tasks</Button>

      </View>

    </ScrollView>
  );
}

