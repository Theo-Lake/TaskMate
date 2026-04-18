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

        textAlign: "center",
        
    },

    img: {
        width: '100%',
        height: 200,
        borderRadius: 5, 
        alignItems:'center',
        marginTop: 12,

    },

    textBox: {
        marginBottom:10
    },
    textBoxTall: {
        marginBottom:10,
        minHeight:200
    },

    nameBox: {
        flexGrow:1,
        flexShrink:1
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
    namesView: {
        paddingHorizontal:20,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        gap:20
    },
    btn:{
        borderRadius:40, 
        backgroundColor:'#3D8252',
        width:200,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    categoryBox:{
        borderRadius:3,
        marginBottom:10,
        backgroundColor:"#fffbff",
        color:"#464146",
    }
});