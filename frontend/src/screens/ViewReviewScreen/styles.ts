import { StyleSheet } from "react-native";
import { black, white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        padding: 20,
    },
    title:{
        color: '#000000',
        marginTop:10,
        marginBottom:20,
        textAlign: 'left',
        fontSize:30,
        alignSelf: 'flex-start'
    },
    dateStringContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E8E8E8',
        borderRadius:5,
        alignSelf: 'stretch',
        marginTop:5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: '#C5C5C5',
        borderWidth:1,
    },
    dateStringText:{
        fontSize:20,
        color:'#333333',
        marginLeft:4,
        minWidth:25,

    },
    rewardContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E8E8E8',
        borderRadius:10,
        alignSelf: 'stretch',
        marginTop:5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: '#C5C5C5',
        borderWidth:1,
    },
    bottomContainer:{
        flexDirection:'row',
        marginTop: 5,
        alignItems:'flex-start'
    },
    assigneesNumField:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E8E8E8',
        borderRadius:10,
        alignSelf: 'flex-start',
        marginTop:5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: '#C5C5C5',
        borderWidth:1,
        marginRight:10,
    },
    assigneesRankField:{
        flex:1,
    },
    taskImage:{
        width:'100%',
        height:220,
        borderRadius:15,
        marginBottom:20,
    },
    btn:{
        flex:1,
        borderRadius:15,
        marginTop:3, 
        backgroundColor:'#3D8252',
        justifyContent: 'center', 
        alignItems: 'center'
    }

});