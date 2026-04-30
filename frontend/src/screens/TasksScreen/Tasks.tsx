import React, { useState, useMemo } from "react";
import { View, StyleSheet, Image, FlatList, ScrollView, SectionList } from 'react-native';
import {  Text, useTheme,Appbar, Avatar, Chip, ActivityIndicator, Menu } from "react-native-paper";
import {styles} from "../TasksScreen/styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../../components/navBar/CustomHeader";
import TaskCard from "../../components/cards/TaskCard";
import NoticeCard from "../../components/cards/NoticeBoardCard";
import { FAB } from 'react-native-paper';

// Logic Imports
// fetches all at once, can't fetch tasks one at a time for infinite scroll
import { useAllTasks, useTaskAssignmentsByUser } from "../../hooks/useTasks"
import { useCurrentUser } from "../../hooks/useUsers";

// used for memo
type DisplayTask = {
  id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: any;
  category: string;
  rawTask: any;
};

export default function TasksScreen({navigation}:any) {
    // fetch tasks
    const { data, isLoading, isError } = useAllTasks();
    // console.log("tasks data:", data);
    const fetchedTasks = Array.isArray(data?.tasks) ? data.tasks : [];

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState<"newest" | "payment_low" | "payment_high">("newest");
    const [sortMenuVisible, setSortMenuVisible] = useState(false);

    const { data: currentUserResponse } = useCurrentUser();
    const currentUser = currentUserResponse?.users?.user ?? currentUserResponse?.user ?? currentUserResponse;

    const { data: assignmentsResponse } = useTaskAssignmentsByUser(Number(currentUser?.userID));
    const appliedTaskIds = useMemo(() => {
        const rows = Array.isArray(assignmentsResponse?.taskAssignment) ? assignmentsResponse.taskAssignment : Array.isArray(assignmentsResponse) ? assignmentsResponse : [];
        return new Set(rows.map((a: any) => Number(a.taskID)));
    }, [assignmentsResponse]);

    // category filter toggle
    const handleCategoryPress = (category: string) => {
      setSelectedCategory((prev) => (prev === category ? "all" : category));
    };

    // sort press
    const handleSortPress = () => {
      setSortOrder((prev) => {
        if (prev === "newest") return "payment_low";
        if (prev === "payment_low") return "payment_high";
        return "newest";
      });
    };

    const getSortLabel = () => {
      if (sortOrder === "newest") return "Newest";
      if (sortOrder === "payment_low") return "Lowest reward";
      return "Highest reward";
    };

    // map tasks
    const mappedTasks = useMemo<DisplayTask[]>(() => {
      return fetchedTasks
        // filters out tasks the current user published from the list
        .filter((task: any) => Number(task.publisherID) !== Number(currentUser?.userID))
        .filter((task: any) => !appliedTaskIds.has(Number(task.taskID)))  
        .map((task: any) => ({
          id: String(task.taskID),
          title: task.name,
          price: task.payment,
          description: task.description,
          imageUrl: task.images ? (Array.isArray(task.images) ? task.images[0] : task.images) : require("../../../assets/img/img.png"),
          category: task.type,
          rawTask: task,
        }));
    }, [fetchedTasks]);

    // apply filter to mapped task list
    // const filteredTasks = useMemo(() => {
    //   if (selectedCategory === "all") return mappedTasks;
    //   return mappedTasks.filter(task => task.category === selectedCategory);
    // }, [mappedTasks, selectedCategory]);

    // apply sort and filter to mapped task list
    const filteredTasks = useMemo(() => {
      let result = selectedCategory === "all" ? [...mappedTasks] : mappedTasks.filter((task) => task.category === selectedCategory);

      if (sortOrder === "payment_low") {
        result.sort((a, b) => Number(a.price) - Number(b.price));
      } 
      else if (sortOrder === "payment_high") {
        result.sort((a, b) => Number(b.price) - Number(a.price));
      } 
      else {
        result.sort(
          (a, b) =>
            new Date(b.rawTask?.created_at ?? 0).getTime() -
            new Date(a.rawTask?.created_at ?? 0).getTime()
        );
      }

      return result;

    }, [mappedTasks, selectedCategory, sortOrder]);

    // sectionlist
    const taskSections = [{
      title: "tasks",
      data: filteredTasks,
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

    // shuffled tasks for noticeboard
    const noticeTasks = useMemo<DisplayTask[]>(() => {
      return shuffleArray(mappedTasks).slice(0, 2);
    }, [mappedTasks]);

    const onTaskPress = (task: DisplayTask) => {
      if(!currentUser?.userID) return;
      const isOwnTask = Number(task.rawTask?.publisherID) === Number(currentUser?.userID);


      if (isOwnTask) {
        navigation.navigate("MyTasksTab", {screen: "ViewOwnTask", params: {taskId: Number(task.id), task: task.rawTask}});
      }

      else {
        navigation.navigate("ViewTaskScreen", {taskId: Number(task.id), task: task.rawTask});
      }


      // navigation.navigate(
      //   isOwnTask ? "ViewOwnTask" : "ViewTaskScreen", {taskId: Number(task.id), task: task.rawTask});
    };

    // loading
    if (isLoading) {
      return (
        <>
        <View>
          <CustomHeader title="Tasks" navigation={navigation} showProfilePicture={true} />
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
          <Text>Loading tasks...</Text>
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
          <CustomHeader title="Tasks" navigation={navigation} showProfilePicture={true} />
        </View>
        <View style={{alignItems:'center', marginTop:20}}>
          <Text>Something went wrong loading the tasks!</Text>
        </View>
        </>
      )
    }

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
                        onPress={() => onTaskPress(item)}
                      />
                    )}
                  />
                </View>
                </>
              }

              renderSectionHeader={() => 
                <View style={{flexDirection: 'row', marginLeft:10, backgroundColor:'#f2f2f2'}}>
                  <View style={styles.chip}>
                    <Menu
                      visible={sortMenuVisible}
                      onDismiss={() => setSortMenuVisible(false)}
                      anchor={
                        <Chip mode="outlined" onPress={() => setSortMenuVisible(true)}>
                          Sort: {getSortLabel()}
                        </Chip>
                      }>
                      <Menu.Item
                        title="Newest"
                        onPress={() => {
                          setSortOrder("newest");
                          setSortMenuVisible(false);
                        }}
                      />
                      <Menu.Item
                        title="Reward low to high"
                        onPress={() => {
                          setSortOrder("payment_low");
                          setSortMenuVisible(false);
                        }}
                      />
                      <Menu.Item
                        title="Reward high to low"
                        onPress={() => {
                          setSortOrder("payment_high");
                          setSortMenuVisible(false);
                        }}
                      />
                    </Menu>
                  </View>

                  <View style={{borderRightWidth:2, borderRightColor:'#969696', marginTop:8, marginBottom:8}}></View>

                  {/* could turn into a component for reuse in events screen */}
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}} stickyHeaderIndices={[1]}>
                    <View style={[styles.chip, {marginLeft:10}]}>
                        <Chip
                            mode="outlined"
                            selected={selectedCategory === "tutoring"}
                            showSelectedCheck={false}
                            style={{backgroundColor: selectedCategory === "tutoring" ? "#d0d0d0" : "#fffbff"}}
                            onPress={() => handleCategoryPress("tutoring")}>
                            Tutoring
                        </Chip>
                    </View>
                    <View style={styles.chip}>
                        <Chip
                            mode="outlined"
                            selected={selectedCategory === "delivery"}
                            showSelectedCheck={false}
                            style={{backgroundColor: selectedCategory === "delivery" ? "#d0d0d0" : "#fffbff"}}
                            onPress={() => handleCategoryPress("delivery")}>
                            Delivery
                        </Chip>
                    </View>
                    <View style={styles.chip}>
                        <Chip
                            mode="outlined"
                            selected={selectedCategory === "freelance"}
                            showSelectedCheck={false}
                            style={{backgroundColor: selectedCategory === "freelance" ? "#d0d0d0" : "#fffbff"}}
                            onPress={() => handleCategoryPress("freelance")}>
                            Freelance
                        </Chip>
                    </View>
                    <View style={styles.chip}>
                        <Chip
                            mode="outlined"
                            selected={selectedCategory === "tech_support"}
                            showSelectedCheck={false}
                            style={{backgroundColor: selectedCategory === "tech_support" ? "#d0d0d0" : "#fffbff"}}
                            onPress={() => handleCategoryPress("tech_support")}>
                            Tech support
                        </Chip>
                    </View>
                    <View style={styles.chip}>
                        <Chip
                            mode="outlined"
                            selected={selectedCategory === "general"}
                            showSelectedCheck={false}
                            style={{backgroundColor: selectedCategory === "general" ? "#d0d0d0" : "#fffbff"}}
                            onPress={() => handleCategoryPress("general")}>
                            General
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
                <TaskCard
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  onPress={() => onTaskPress(item)}
                />
              )}
              ListEmptyComponent={
                <View>
                  <Text>No tasks found.</Text>
                </View>
              }
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

