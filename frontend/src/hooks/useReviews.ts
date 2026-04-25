import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { number } from "zod";
import { createReview, getAllReviews,getReviewById,getReviewsGivenToUser,getReviewsMadeByUser,getUserRating } from "../api/reviews";
import { Vibration } from "react-native";
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
            const userId = await AsyncStorage.getItem('userId');
            if (!userId){
                throw new Error('ID is null. relogin')
            }
            const rawRew = await getReviewsGivenToUser(Number(userId));
            return rawRew.map((review:any) =>({
                ...review,
                rating: ratingToNUm[review.rating] || Number(review.rating) || 0
            }))
        },
    })
}

export const useUserReviews = (userId: string | number | undefined) => {
    return useQuery({
        queryKey:["userReviews"],
        queryFn: async()=>{
            if (!userId){
                throw new Error('ID is null. Try again')
            }
            const rawRew = await getReviewsGivenToUser(Number(userId));
            return rawRew.map((review:any) =>({
                ...review,
                rating: ratingToNUm[review.rating] || Number(review.rating) || 0
            }))
        },
        enabled: !!userId,
    })
}

export const useReview = (reviewId: string) => {
    return useQuery({
        queryKey:["Review", reviewId],
        queryFn: async()=>{
            if (!reviewId){
                throw new Error('ID is null. Try again')
            }
            const rawRew = await getReviewById(Number(reviewId));
            return {
                ...rawRew,
                rating: ratingToNUm[rawRew.rating] || 0
            };

        },
        enabled: !!reviewId,
    })
}

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({assigneeId, data}: {assigneeId: number, data: any}) => {
            return await createReview(Number(assigneeId),data);
        },
        onSuccess:(res, variables) => {
            queryClient.invalidateQueries({queryKey:["userReviews", variables.assigneeId]});
        }
    })
}