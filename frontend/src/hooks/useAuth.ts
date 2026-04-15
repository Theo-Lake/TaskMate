import {useMutation} from '@tanstack/react-query';
import { verifyEmail } from '../api/auth';
import client from '../api/client';


export const useVerifyEmail = () =>{
    return useMutation({
        mutationFn:({userId, token}:{userId: number;token:string}) =>
            verifyEmail(userId,token),
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials) => {
            const res = await client.post("/auth/login", credentials);
            return res.data;
        }
    })
}