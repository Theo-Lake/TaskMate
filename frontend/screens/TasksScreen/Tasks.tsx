import React from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip } from "react-native-paper";
import {styles} from "../TasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import TaskCard from "../../components/cards/TaskCard";
import NoticeCard from "../../components/cards/NoticeBoardCard";
import { FAB } from 'react-native-paper';

// hardcoded tasks, in the future we'll grab from the server
const tasks = [
  {
    id: '1',
    title: 'Study buddy',
    price: '£10',
    imageUrl: require('../../assets/img/img.png'),
    description: 'need study buddy for 2 hours',
  },
  {
    id: '2',
    title: 'Referee',
    price: '£20',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Referee for game on Sunday night at 8pm',
  },
  {
    id: '3',
    title: 'Moving stuff',
    price: '£30',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Helped wanted moving items out of my flat',
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
  },
  {
    id: '6',
    title: 'Referee',
    price: '£20',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Referee for game on Sunday night at 8pm',
  },
  {
    id: '7',
    title: 'Moving stuff',
    price: '£30',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Helped wanted moving items out of my flat',
  },
  {
    id: '8',
    title: 'test',
    price: '£14',
    imageUrl: require('../../assets/img/img.png'),
    description: 'asdfasdf',
  },
];

// hardcoded noticeboard tasks
const noticeTasks = [
  {
    id: '1',
    title: 'Study buddy',
    price: '£10',
    imageUrl: require('../../assets/img/img.png'),
    description: 'need study buddy for 2 hours',
  },
  {
    id: '2',
    title: 'Referee',
    price: '£20',
    imageUrl: require('../../assets/img/img.png'),
    description: 'Referee for game on Sunday night at 8pm',
  },
];

const taskSections = [{
  title: "tasks",
  data: tasks,
},];

export default function TasksScreen({navigation}:any) {
    return (
      <>
        <View>
            <CustomHeader title="Tasks" navigation={navigation} showProfilePicture={true} />
        </View>

        <View style={{flex:1}}>
          <View>
            <SectionList
              sections={taskSections}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={true}
              ListHeaderComponent={
                <>
                <View style={{alignItems:'center', paddingTop:10, }}>
                  <Text variant='titleSmall'>
                    Tasks you might like
                  </Text>
                </View>

                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={noticeTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <NoticeCard
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        description={item.description}
                        onPress={() => navigation.navigate("ViewTaskScreen")}
                      />
                    )}
                  />
                </View>
                </>
              }

              renderSectionHeader={() => 
                <View style={{flexDirection: 'row', marginLeft:10, backgroundColor:'#f2f2f2'}}>
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
              }
              renderItem={({ item }) => (
                <TaskCard
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  onPress={() => navigation.navigate("ViewTaskScreen")}
                />
              )}
            />
          </View>

          <FAB
              icon="plus"
              style={styles.fab}
              customSize={75}
              color="white"
              onPress={() => navigation.navigate('CreateTaskScreen')}
          />

        </View>
      </>
  );
}

