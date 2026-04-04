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
        marginBottom:20,
        textAlign: "center",
        fontSize:30,
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
    settingsButton:{

    },
    textBox:{
        marginBottom:1,
        backgroundColor: 'transparent',
        paddingHorizontal:0,
        borderWidth: 0
    },
    chip: {
        flexDirection:'row',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },

});