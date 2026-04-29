import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import {
	Text,
	useTheme,
	TextInput,
	Checkbox,
	Button,
	IconButton,
	Menu,
} from "react-native-paper";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "../../components/navBar/CustomHeader";
import { TextInputMask } from "react-native-masked-text";

import { useCreateEvent } from "../../hooks/useEvents";
import { validate } from "../../validation/validate";
import { EventSchema } from "../../validation/schemas/events";

export default function CreateEventScreen({ navigation }: any) {
	const [timeLimit, setTimeLimit] = React.useState(false);
	const [eventTitle, setTaskTitleText] = React.useState("");
	const [eventDesc, setTaskDesc] = React.useState("");
	const [assignees, setAssignees] = useState("");
	const [peopleRequired, setPeopleRequired] = useState("");
	const [date, setDate] = useState("");
	const [eventType, setEventType] = useState("");
	const [eventTypeMenuVisible, setEventTypeMenuVisible] = useState(false);
	const [location, setLocation] = useState("");

	//image loading:
	const [imageUri, setImageUri] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	// errors
	const [errors, setErrors] = useState<any>({});

	const { mutate: createEvent, isPending } = useCreateEvent();

	const handleSelectEventType = (type: string) => {
		setEventType(type);
		setEventTypeMenuVisible(false);
	};

	// nicer looking text for category picker
	// could also use touppercase since we don't have any underscores to worry about here
	const getEventTypeLabel = (type: string) => {
		switch (type) {
			case "social":
				return "Social";
			case "sport":
				return "Sport";
			case "academic":
				return "Academic";
			case "career":
				return "Career";
			case "cultural":
				return "Cultural";
			case "volunteering":
				return "Volunteering";
			case "other":
				return "Other";
			default:
				return "Category";
		}
	};

	//Images loading:
	const pickImageFromPhone = async () => {
		let imagRes = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.3,
			base64: true,
		});
		if (!imagRes.canceled) {
			const dataUri = `data:image/jpeg;base64,${imagRes.assets[0].base64}`;
			setImageUri(dataUri);
			setImageUrl(dataUri);
		}
	};
	let imageContent;

	if (imageUri && imageUri?.trim() !== "") {
		imageContent = (
			<View style={styles.imagePrevContain}>
				<Image source={{ uri: imageUri }} style={styles.img} />
				<Button
					mode="text"
					onPress={() => {
						setImageUri(null);
						setImageUrl(null);
					}}
					textColor="red"
					icon="delete"
				>
					Delete image
				</Button>
			</View>
		);
	} else {
		imageContent = (
			<TouchableOpacity
				style={styles.imagePicker}
				onPress={pickImageFromPhone}
			>
				<IconButton icon="camera" size={30} />
				<Text>Upload image</Text>
			</TouchableOpacity>
		);
	}

	const parseDueDate = (value: string) => {
		const [day, month, year] = value.split("/");
		if (!day || !month || !year) return null;

		const parsed = new Date(Number(year), Number(month) - 1, Number(day));
		if (Number.isNaN(parsed.getTime())) return null;

		return parsed.toISOString();
	};

	const getFallbackDate = () => {
		const d = new Date();
		d.setDate(d.getDate() + 7);
		return d.toISOString();
	};

	const handlePostEvent = () => {
		const parsedDueDate = parseDueDate(date);
		const imagesArray = imageUrl ? [imageUrl] : [];

		const formData = {
			name: eventTitle,
			description: eventDesc,
			dueDate: parsedDueDate,
			type: eventType,
			images: imagesArray,
			location: location,
			peopleRequired: Number(peopleRequired),
		};

		const result = validate(EventSchema, formData);

		if (!result.success) {
			console.log("validation failed:", result.errors.fieldErrors);
			setErrors(result.errors.fieldErrors);
			return;
		}

		setErrors({});

		console.log("validated data:", result.data);
		createEvent(
			{
				...result.data,
				peopleRequired: Number(peopleRequired),
				location,
				images: imagesArray,
			},
			{
				onSuccess: () => {
					navigation.navigate("EventsTab", {
						screen: "EventsScreen",
					});
				},
				onError: (error: any) => {
					console.error("Error:", error);
					console.log("status:", error?.response?.status);
					console.log("data:", error?.response?.data);
					console.log("url:", error?.config?.url);
				},
			},
		);
	};

	const handleTextNum = (text: string) => {
        const cleanVal = text.replace(/[^0-9]/g, '');
        const parseVal = parseInt(cleanVal, 10);

        if (!isNaN(parseVal)) {
            return parseVal.toString();
        }
        else {
            return '';
        }
    };

	return (
		<>
			<View>
				<CustomHeader
					title="Create Event"
					navigation={navigation}
					showBackArrow={true}
					showProfilePicture={false}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 :0 }>
				<ScrollView>
					<View style={styles.content}>
						<TextInput
							mode="outlined"
							label="Event title:"
							value={eventTitle}
							onChangeText={(text) => setTaskTitleText(text)}
							style={styles.textBox}
							error={!!errors.name}
						/>
						{errors.name && (
							<Text style={{ color: "red" }}>
								{errors.name[0]}
							</Text>
						)}
						<TextInput
							mode="outlined"
							label="Event description:"
							value={eventDesc}
							onChangeText={(text) => setTaskDesc(text)}
							style={styles.textBoxTall}
							multiline={true}
							textAlignVertical="top"
							error={!!errors.description}
						/>
						{errors.description && (
							<Text style={{ color: "red" }}>
								{errors.description[0]}
							</Text>
						)}

						
							<TextInput
								mode="flat"
								label={"Due Date (DD/MM/YYYY)"}
								style={styles.textBox}
								left={<TextInput.Icon icon="calendar" />}
								keyboardType="numeric"
								value={date}
								onChangeText={setDate}
								render={(props) => (
									<TextInputMask
										{...(props as any)}
										type={"datetime"}
										options={{ format: "DD/MM/YYYY" }}
									/>
								)}
							/>{errors.dueDate && (<Text style={{ color: "red" }}>{errors.dueDate[0]}</Text>
						)}

						<Text variant="labelLarge" style={styles.title}>
							Upload event image:
						</Text>

						{imageContent}
						<TextInput
							mode="outlined"
							label="Location:"
							value={location}
							onChangeText={(text) => setLocation(text)}
							style={styles.textBox}
							error={!!errors.location}
						/>
						{errors.location && (
							<Text style={{ color: "red" }}>
								{errors.location[0]}
							</Text>
						)}
						<TextInput
							mode="outlined"
							label="Participants:"
                        	keyboardType="numeric"
							value={peopleRequired}
							onChangeText={text => setPeopleRequired(handleTextNum(text))}
							style={styles.textBox}
							left={<TextInput.Icon icon="account-outline" />}
						/>

						<Menu
							visible={eventTypeMenuVisible}
							onDismiss={() => setEventTypeMenuVisible(false)}
							anchor={
								<Button
									mode="outlined"
									onPress={() =>
										setEventTypeMenuVisible(true)
									}
									icon="chevron-down"
									style={styles.categoryBox}
								>
									{getEventTypeLabel(eventType)}
								</Button>
							}
						>
							<Menu.Item
								title="Social"
								onPress={() => handleSelectEventType("social")}
							/>
							<Menu.Item
								title="Sport"
								onPress={() => handleSelectEventType("sport")}
							/>
							<Menu.Item
								title="Academic"
								onPress={() =>
									handleSelectEventType("academic")
								}
							/>
							<Menu.Item
								title="Career"
								onPress={() => handleSelectEventType("career")}
							/>
							<Menu.Item
								title="Cultural"
								onPress={() =>
									handleSelectEventType("cultural")
								}
							/>
							<Menu.Item
								title="Volunteering"
								onPress={() =>
									handleSelectEventType("volunteering")
								}
							/>
							<Menu.Item
								title="Other"
								onPress={() => handleSelectEventType("other")}
							/>
						</Menu>
						<View style={{ alignItems: "center" }}>
							<Button
								icon="pencil"
								mode="contained"
								onPress={handlePostEvent}
								style={styles.btn}
								labelStyle={{ fontSize: 20, lineHeight: 25 }}
								contentStyle={{
									marginVertical: 10,
									width: "100%",
								}}
								disabled={isPending}
								loading={isPending}
							>
								{isPending ? "Submitting..." : "Post Event"}
							</Button>
						</View>
					</View>
				</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</>
	);
}
