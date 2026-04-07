import React from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip } from "react-native-paper";
import {styles} from "../TasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import EventCard from "../../components/cards/EventCard";
import NoticeCard from "../../components/cards/NoticeBoardCard";
import { FAB } from 'react-native-paper';

// hardcoded tasks, in the future we'll grab from the server
const events = [
  {
    id: '1',
    title: 'Games night',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'board games night at barkers!',
  },
  {
    id: '2',
    title: 'Footy at sports centre',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'chill football match, all skill levels',
  },
  {
    id: '3',
    title: 'Jazzercise',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'jazzercise',
  },
  {
    id: '4',
    title: 'test',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'asdfasdf',
  },
  {
    id: '5',
    title: 'Games night',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'board games night at barkers!',
  },
  {
    id: '6',
    title: 'Footy at sports centre',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'chill football match, all skill levels',
  },
  {
    id: '7',
    title: 'Jazzercise',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'jazzercise',
  },
  {
    id: '8',
    title: 'test',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'asdfasdf',
  },
];

// hardcoded noticeboard events
const noticeEvents = [
  {
    id: '1',
    title: 'Games night',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'board games night at barkers!',
  },
  {
    id: '2',
    title: 'Footy at sports centre',
    time: '17:00',
    date: '20/12/2026',
    imageUrl: require('../../assets/img/img.png'),
    description: 'chill football match, all skill levels',
  },
];

const eventSections = [{
    title: "events",
    data: events,
}];

export default function EventsScreen({navigation}:any) {
    return (
        <>
            <View>
                <CustomHeader title="Events" navigation={navigation} showProfilePicture={true} />
            </View>
    
            <View style={{flex:1}}>
                <View>
                <SectionList
                    sections={eventSections}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={true}
                    ListHeaderComponent={
                    <>
                    <View style={{alignItems:'center', paddingTop:10, }}>
                        <Text variant='titleSmall'>
                        Events you might like
                        </Text>
                    </View>
    
                    <View>
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={noticeEvents}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <NoticeCard
                            title={item.title}
                            price={item.date}
                            imageUrl={item.imageUrl}
                            description={item.description}
                            onPress={() => console.log('Opened event', item.title)}
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
                            <Chip mode="outlined" onPress={() => console.log('tennis pressed')}>
                                Tennis
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip  mode="outlined" onPress={() => console.log('football pressed')}>
                                Football
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip  mode="outlined" onPress={() => console.log('pub quiz pressed')}>
                                Pub Quiz
                            </Chip>
                        </View>
                        </ScrollView>
                    </View>
                    }
                    renderItem={({ item }) => (
                    <EventCard
                        title={item.title}
                        time={item.time}
                        date={item.date}
                        imageUrl={item.imageUrl}
                        description={item.description}
                        onPress={() => console.log('Opened event', item.title)}
                    />
                    )}
                />
                </View>
    
                <FAB
                    icon="plus"
                    style={styles.fab}
                    customSize={75}
                    color="white"
                    onPress={() => navigation.navigate('CreateEventScreen')}
                />
    
            </View>
        </>

    );
  }