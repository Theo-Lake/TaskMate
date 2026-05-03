import client from "./client";

export async function getALlTransactions() {
    const res = await client.get("/transaction");
    return res.data;
}

export async function getTransactionById(transactionId: number) {
    const res = await client.get(`/transaction/byTransactionId/${transactionId}`);
    return res.data;
}

export async function getALlTransactionsByUser() {
    const res = await client.get("/transaction/allByUserId");
    return res.data;
}

// export async function processTransaction(taskId: number) {
//     const res = await client.post(`/transaction/${taskId}`);
//     return res.data;
// }