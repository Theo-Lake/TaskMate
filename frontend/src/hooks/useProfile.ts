import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey:["myProfile"],
        queryFn: async()=>{
            const myID = await AsyncStorage.getItem('myID');
            if (!myID){
                throw new Error('ID is null. relogin')
            }
            const res = await client.get(`/users/${myID}`);
            return res.data.users.user;
        },
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userData: {firstName?: string, lastName?: string, profilePicture?: string})=>{
            const res = await client.patch('/users/me', userData)
            return res.data;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['myProfile']});
        }
    })
}