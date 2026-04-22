import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { Button, Text } from 'react-native-paper';

interface StarRatingGroupButtonsProps {
    rating: number;
    setRating: (val: number) => void;
}

export default function StarRatingGroupButtons({rating, setRating}: StarRatingGroupButtonsProps){
    const stars = [1,2,3,4,5];
    return(
        <View style={styles.container}>
            <Text variant='titleMedium' style={styles.label}>
                Select rating:
            </Text>
            <View style={styles.row}>
                {stars.map((num) => (
                    <TouchableOpacity
                        key={num}
                        onPress={()=> setRating(num)}
                        style={styles.starButton}
                    >
                        <MaterialCommunityIcons
                            name={num <= rating?'star' : 'star-outline'}
                            size={45}
                            color={num <= rating ? '#3D8252' : '#C5C5C5'}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 15,
        width: '100%',
    },
    label: {
        marginBottom:10,
        fontWeight:'bold',
        color:'#333'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    button:{
        flex:1,
        marginHorizontal:4,
        borderRadius:8,
        paddingVertical:2,
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold'
    },
    starButton:{
        padding:5
    }
})