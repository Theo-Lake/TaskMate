import client from './client'


export const getAllUsers = async () => {
    const res = await client.get("/users");
    return res.data
}

export const getUserById = async (userID:string) =>{
    const res = await client.get(`/users/${userID}`)
    return res.data
}

export const createUser = async (userData: any) => {
    const res = await client.post("/users", userData)
    return res.data
}
export const updateUser = async (userID: string, updateData:any) => {
    const res = await client.patch(`/users/${userID}`, updateData)
    return res.data
}

export const deleteUser  = async (userId: string) => {
    const res = await client.delete(`/users/${userId}`)
    return res.data
}