import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding: 20,
        backgroundColor: '#ffffff'
    },
    title:{
        textAlign: "center",
    },
    topOfProfile:{
        margin:10,
        flexDirection: "row",
        gap:5,
        alignItems:"center"

    },
    profilePic:{

        justifyContent:"center",

    },
    profileInfo:{
        justifyContent:"center",
    },
    textBox: {
        marginBottom:10
    },
    editingSection:{
        flexDirection:"column",
        flex:1
    },
    img: {
        width: '100%',
        height: 200,
        borderRadius: 5, 
        alignItems:'center',
        marginTop: 12,

    },
    imagePicker:{
        height: 100, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderStyle: 'dashed', 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
});