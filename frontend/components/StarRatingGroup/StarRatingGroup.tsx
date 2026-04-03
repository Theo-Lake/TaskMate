import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons'

export default function StarRating({rating}){
    const stars = [1,2,3,4,5];
    return(
        <View style={{flexDirection:'row', alignItems:'center', gap: 2}}>
            {stars.map((starP) => {
                let iconTyp = 'star-outline';
                if (rating >= starP){
                    iconTyp = 'star';
                }else if(rating >= starP - 0.5){
                    iconTyp = 'star-half-full';
                }

                return(
                    <MaterialCommunityIcons key={starP} name={iconTyp} size={24} color="#FFC107"/>
                )
            })}
        </View>
    )
}