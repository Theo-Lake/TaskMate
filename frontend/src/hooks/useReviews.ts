import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

//need to format rewiews from string to num becuse everythiong on front is asking for num:
const ratingToNUm: Record<string, number>={
    'ONE': 1,
    'TWO':2,
    'THREE':3,
    'FOUR':4,
    'FIVE':5
}

export const useMyReceivedReviews = () => {
    return useQuery({
        queryKey:["myReviews"],
        queryFn: async()=>{
            const myID = await AsyncStorage.getItem('myID');
            if (!myID){
                throw new Error('ID is null. relogin')
            }
            const res = await client.get(`/reviews/received/${myID}`);
            console.log(res.data)
            const rawRew = res.data.reviews
            return rawRew.map((review:any) =>({
                ...review,
                rating: ratingToNUm[review.rating] || Number(review.rating) || 0
            }))
        },
    })
}