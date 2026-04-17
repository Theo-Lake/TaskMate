import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export const useProfile = (userId : number | null) => {
    return useQuery({
        queryKey:["profile", userId],
        queryFn: async()=>{
            const res = await client.get(`/users/${userId}`);
            return res.data.users.user
        },
        enabled: !!userId,
    })
}