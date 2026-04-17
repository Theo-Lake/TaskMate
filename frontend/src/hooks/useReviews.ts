import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export const useReceivedReviews = (userId : number | null) => {
    return useQuery({
        queryKey:["profile", userId],
        queryFn: async()=>{
            const res = await client.get(`/reviews/user/${userId}`);
            return res.data;
        },
        enabled: !!userId,
    })
}