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
    fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#3D8252',
    },
    chip: {
        flexDirection:'row',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
});