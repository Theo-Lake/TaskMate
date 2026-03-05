import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffffff'
    },
    content:{
        justifyContent:'center',
        padding: 20,
    },
    title:{
        marginBottom:20,
        textAlign: "center",
        fontSize:30,
    },

    img: {
        alignItems:'center'
    },

    textBox: {
        marginBottom:10
    },

    nameBox: {
        flexGrow:1,
        flexShrink:1
    },

    namesView: {
        paddingHorizontal:20,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        gap:20
    }
});