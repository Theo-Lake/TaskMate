import React, { useState, useMemo } from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip, ActivityIndicator } from "react-native-paper";
import {styles} from "../TasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import EventCard from "../../components/cards/EventCard";
import NoticeCard from "../../components/cards/NoticeBoardCard";
import { FAB } from 'react-native-paper';

import { useAllEvents } from "../../hooks/useEvents";
import { useCurrentUser } from "../../hooks/useUsers";

type DisplayEvent = {
    id: string;
    title: string;
    description: string;
    time: string;
    date: string;
    imageUrl: any;
    category: string;
    rawEvent: any;
};

const formatDate = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleDateString('gb-GB')
};

const formatTime = (isoString: string)=>{
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"});
};

export default function EventsScreen({navigation}:any) {
    // fetch events
    const { data, isLoading, isError } = useAllEvents();
    const fetchedEvents = Array.isArray(data?.events) ? data.events : [];

    const [selectedCategory, setSelectedCategory] = useState("all");

    const { data: currentUserResponse } = useCurrentUser();
    const currentUser = currentUserResponse?.users?.user ?? currentUserResponse?.user ?? currentUserResponse;
    

    // category filter toggle
    const handleCategoryPress = (category: string) => {
      setSelectedCategory((prev) => (prev === category ? "all" : category));
    };

    // map events
        const mappedEvents = useMemo<DisplayEvent[]>(() => {
          return fetchedEvents
            // filters out events the current user published from the list
            .filter((event: any) => Number(event.publisherID) !== Number(currentUser?.userID))
            .map((event: any) => ({
            id: String(event.eventID),
            title: event.name,
            description: event.description,
            time: formatTime(event.dueDate),
            date: formatDate(event.dueDate),
            imageUrl: event.imageUrl,
            category: event.type,
            rawEvent: event,
          }));
    }, [fetchedEvents]);

    // apply filter to mapped events list
    const filteredEvents = useMemo(() => {
        if (selectedCategory === "all") return mappedEvents;
        return mappedEvents.filter(event => event.category === selectedCategory);
    }, [mappedEvents, selectedCategory]);

    // sectionlist
    const eventSections = [{
        title: "events",
        data: filteredEvents,
    },];

    // random tasks for noticeboard
    const shuffleArray = <T,>(array: T[]) => {
        const copy = [...array];

        for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    };

    // shuffled events for noticeboard
    const noticeEvents = useMemo<DisplayEvent[]>(() => {
        return shuffleArray(mappedEvents).slice(0, 2);
    }, [mappedEvents]);

    const onEventPress = (event: DisplayEvent) => {
      navigation.navigate("ViewEventScreen", {eventId: Number(event.id), event: event.rawEvent});
    };

    // loading
    if (isLoading) {
      return (
        <>
        <View>
          <CustomHeader title="Events" navigation={navigation} showProfilePicture={true} />
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
          <Text>Loading events...</Text>
          <ActivityIndicator size="large" style={{marginTop:20}}/>
        </View>
        </>
      )
    }

    // error
    if (isError) {
        return (
            <>
            <View>
                <CustomHeader title="Events" navigation={navigation} showProfilePicture={true} />
            </View>
            <View style={{alignItems:'center', marginTop:20}}>
                <Text>Something went wrong loading the events!</Text>
            </View>
            </>
        )
    }

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
                            onPress={() => onEventPress(item)}
                            />
                        )}
                        />
                    </View>
                    </>
                    }
    
                    renderSectionHeader={() => 
                    <View style={{flexDirection: 'row', backgroundColor:'#f2f2f2'}}>
                        {/* could turn into a component for reuse in events screen */}
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}} stickyHeaderIndices={[1]}>
                        <View style={[styles.chip, {marginLeft:10}]}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "social"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "social" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("social")}>
                                Social
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "sport"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "sport" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("sport")}>
                                Sport
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "academic"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "academic" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("academic")}>
                                Academic
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "career"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "career" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("career")}>
                                Career
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "cultural"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "cultural" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("cultural")}>
                                Cultural
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "volunteering"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "volunteering" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("volunteering")}>
                                Volunteering
                            </Chip>
                        </View>
                        <View style={styles.chip}>
                            <Chip
                                mode="outlined"
                                selected={selectedCategory === "other"}
                                showSelectedCheck={false}
                                style={{backgroundColor: selectedCategory === "other" ? "#d0d0d0" : "#fffbff"}}
                                onPress={() => handleCategoryPress("other")}>
                                Other
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
                        onPress={() => onEventPress(item)}
                    />
                    )}
                    ListEmptyComponent={
                        <View>
                            <Text>No events found.</Text>
                        </View>
                    }
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