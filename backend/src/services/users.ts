import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllUsers() {
    return await db.user.findMany();
}

export async function getUserById(userID: Number) {
    return await db.user.findUnique({
        where: {
            userID: Number(userID),
        },
    });
}

export async function createUser(userID: Number, body: JsonObject) {
    //TODO create
    let { 
        username, 
        firstName, 
        lastName, 
        universityID, 
        email, 
        password_hash, 
        occupation 
    } = body;

    return await db.user.create({
        data: {
            userID: Number(userID),
            username: username as string,
            firstName: firstName as string,
            lastName: lastName as string,
            universityID: Number(universityID),
            email: email as string,
            password_hash: password_hash as string,
            occupation: occupation as string
        }
    });
}

export async function updateUser(userID: Number, body: JsonObject) {
    //TODO create
    let { 
        username, 
        firstName, 
        lastName, 
        password_hash, 
        publishedJobs, 
        assignedJobs, 
        occupation, 
        profilePicture, 
        myPublishedReviews, 
        myRecievedReviews, 
        emailVerfied, 
        emailVerificationTokens, 
        conversationsAsUser1, 
        conversationsAsUser2, 
        sentMessages
    } = body;

    return await db.user.update({
        where: { userID: Number(userID) },
        data: {
            username: username as string | undefined,
            firstName: firstName as string | undefined,
            lastName: lastName as string | undefined,
            password_hash: password_hash as string | undefined,
            publishedJobs: publishedJobs 
                ? { connect: (publishedJobs as { taskID: number }[]).map((task) => ({ taskID: task.taskID })) }
                : undefined,
            assignedJobs: assignedJobs
                ? { connect: (assignedJobs as { assignmentID: number }[]).map((task) => ({ assignmentID: task.assignmentID })) }
                    : undefined,
            occupation: occupation as string | undefined,
            profilePicture: profilePicture as string | undefined,
            myPublishedReviews: myPublishedReviews
                ? { connect: (myPublishedReviews as { reviewID: number}[]).map((review) => ({ reviewID: review.reviewID })) }
                : undefined,
            myRecievedReviews: myRecievedReviews
                ? { connect: (myRecievedReviews as { reviewID: number}[]).map((review) => ({ reviewID: review.reviewID })) }
                : undefined,
            emailVerified: emailVerfied as boolean | undefined,
            emailVerificationTokens: emailVerificationTokens
                ? { connect: (emailVerificationTokens as {id: number}[]).map((token) => ({ id: token.id })) }
                : undefined,
            conversationsAsUser1: conversationsAsUser1
                ? { connect: (conversationsAsUser1 as {conversationID: number}[]).map((convo) => ({ conversationID: convo.conversationID })) }
                : undefined,
            conversationsAsUser2: conversationsAsUser2
                ? { connect: (conversationsAsUser2 as {conversationID: number}[]).map((convo) => ({ conversationID: convo.conversationID })) }
                : undefined,
            sentMessages: sentMessages
                ? { connect: (sentMessages as {messageID: number}[]).map((convo) => ({ messageID: convo.messageID })) }
                : undefined,
        }
    });
}

export async function deleteUser(userID: Number) {
    //TODO create    
    await db.user.delete({
        where: {
            userID: Number(userID),
        },
    });
    
    return;
}

export const userServices = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};