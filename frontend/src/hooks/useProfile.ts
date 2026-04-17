import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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