import React, { useMemo, useState } from "react";
import { View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip, Button } from "react-native-paper";
import {styles} from "../MyTasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import TaskCard from "../../components/cards/TaskCard";
import { FAB } from 'react-native-paper';

// hardcoded tasks, in the future we'll grab from the server
// added status to filter list of tasks
const tasks = [
  {
    id: '1',
    title: 'Study buddy',
    price: '£10',
    imageUrl: require('../../assets/img/img.png'),
    description: 'need study buddy for 2 hours',
    status: "published",
  },
  {
    id: '2',
    title: 'Referee',
    price: '£20',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Referee for game on Sunday night at 8pm',
    status: "published",
  },
  {
    id: '3',
    title: 'Moving stuff',
    price: '£30',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Helped wanted moving items out of my flat',
    status: "published",
  },
  {
    id: '4',
    title: 'test',
    price: '£14',
    imageUrl: require('../../assets/img/img.png'),
    description: 'asdfasdf',
  },
  {
    id: '5',
    title: 'Study buddy',
    price: '£10',
    imageUrl: require('../../assets/img/img.png'),
    description: 'need study buddy for 2 hours',
    status: "published",
  },
  {
    id: '6',
    title: 'Referee',
    price: '£20',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Referee for game on Sunday night at 8pm',
    status: "assigned",
  },
  {
    id: '7',
    title: 'Moving stuff',
    price: '£30',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Helped wanted moving items out of my flat',
    status: "published",
  },
  {
    id: '8',
    title: 'test',
    price: '£14',
    imageUrl: require('../../assets/img/img.png'),
    description: 'asdfasdf',
    status: "assigned",
  },
];

type TaskStatus = "published" | "assigned";

export default function MyTasksScreen({navigation}:any) {

    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("published");

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesStatus = task.status === selectedStatus;

            return matchesStatus;
        });
    }, [selectedStatus])

    return (
        <>
        <View style={{flex:1}}>
            <CustomHeader title="My Tasks" navigation={navigation} showProfilePicture={true}/>
        </View>

        <View style={{flex:7}}>

            <View style={{flexDirection: 'row', marginTop:25, marginHorizontal:6}}>
                <Button 
                    style={[styles.button, selectedStatus === "published" ? styles.activeButton : styles.inactiveButton]} 
                    mode={selectedStatus === "published" ? "contained" : "outlined"} 
                    icon="star"
                    textColor="#ffffff"
                    onPress={() => setSelectedStatus("published")}
                    >Published
                </Button>
                <Button 
                    style={[styles.button, selectedStatus === "assigned" ? styles.activeButton : styles.inactiveButton]} 
                    mode={selectedStatus === "assigned" ? "contained" : "outlined"} 
                    icon="check" 
                    textColor="#ffffff"
                    onPress={() => setSelectedStatus("assigned")}
                    >Assigned
                </Button>
            </View>

            <View style={{flexDirection: 'row', marginLeft:10}}>
            <View style={styles.chip}>
                <Chip mode="outlined" onPress={() => console.log('sort pressed')}>Sort</Chip>
            </View>

            <View style={{borderRightWidth:2, borderRightColor:'#969696', marginTop:8, marginBottom:8}}></View>

            {/* could turn into a component for reuse in events screen */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}} stickyHeaderIndices={[1]}>
                <View style={[styles.chip, {marginLeft:10}]}>
                    <Chip
                        mode="outlined"
                        onPress={() => console.log('social pressed')}>
                        Social
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip mode="outlined" onPress={() => console.log('misc pressed')}>
                        Misc
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip  mode="outlined" onPress={() => console.log('Shopping pressed')}>
                        Shopping
                    </Chip>
                </View>
                <View style={styles.chip}>
                    <Chip  mode="outlined" onPress={() => console.log('requesting pressed')}>
                        Requesting
                    </Chip>
                </View>
            </ScrollView>
            </View>
                <View style={{flex:1}}>
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                    <TaskCard
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        description={item.description}
                        onPress={() => console.log('Opened task', item.title)}
                    />
                    )}
                />
                </View>

                <FAB
                    icon="plus"
                    style={styles.fab}
                    customSize={75}
                    color="white"
                    onPress={() => navigation.navigate('TasksTab', { screen: 'CreateTaskScreen' })}
                />
    
            </View>
        </>
    );
  }

