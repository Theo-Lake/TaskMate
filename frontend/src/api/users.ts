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
export const updateUser = async (updateData: any) => {
    const res = await client.patch(`/users/me`, updateData)
    return res.data
}

export const deleteUser = async () => {
    const res = await client.delete(`/users/me`)
    return res.data
}