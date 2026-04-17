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
    arows:{
        marginBottom:20,
        textAlign: 'center',
        fontWeight: '200'
    },
    logo:{
        width:'70%',
        aspectRatio:1,
        marginTop:40,
        marginLeft:40,
        marginRight:40,
        marginBottom:10,
    },
    subTitle:{
        fontSize:30,
        paddingTop:30,
    },
    btn: {
        flex: 1, 
        marginHorizontal: 5,
    }
});