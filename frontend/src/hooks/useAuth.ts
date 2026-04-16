import {useMutation} from '@tanstack/react-query';
import { verifyEmail } from '../api/auth';
import client from '../api/client';
import { storeTokens } from '../auth/auth';


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
            const { accessToken, refreshToken } = res.data;
            await storeTokens(accessToken, refreshToken);
            return res.data;
        }
    })
}