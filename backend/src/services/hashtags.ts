import { hash } from "node:crypto";
import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";


async function getHashtagByID(hashtagID: Number) {
    return await db.hashtags.findUnique({
        where: { hashtagID: Number(hashtagID) },
    });
}

async function getAllHashtags() {
    return await db.hashtags.findMany();
}


async function getAllHashtagsFromTask(taskID: Number) {
    const task = await db.task.findUnique({
        where: { taskID: Number(taskID) },
        include: { 
            hashtags: {
                select: {
                    hashtagID: true,
                },
            }, 
        },
    });

    return task?.hashtags ?? [];
}


async function getAllTasksFromHashtag(hashtagID: Number) {
    const hashtag = await db.hashtags.findUnique({
        where: { hashtagID: Number(hashtagID) },
        include: { 
            tasks: {
                select: {
                    taskID: true,
                },
            }, 
        },
    });

    return hashtag?.tasks ?? [];
}


async function createHashtag(body: JsonObject) {
    let { name } = body;

    return await db.hashtags.create({
        data: {
            name: name as string,
        }
    });
}


async function deleteHashtag(hashtagID: Number) {
    return await db.hashtags.delete({
        where: { hashtagID: Number(hashtagID) },
    });
}


async function addHashtagToTask(taskID: Number, hashtagID: Number) {
    return await db.task.update({
        where: { taskID: Number(taskID) },
        data: {
            hashtags: {
                connect: { hashtagID: Number(hashtagID) },
            },
        },
        include: { 
            hashtags: {
                select: {
                    hashtagID: true,
                },
            }, 
        },
    });
}


async function removeHashtagFromTask(taskID: Number, hashtagID: Number) {
    return await db.task.update({
        where: { taskID: Number(taskID) },
        data: {
            hashtags: {
                disconnect: { hashtagID: Number(hashtagID) },
            },
        },
        include: { 
            hashtags: {
                select: {
                    hashtagID: true,
                },
            }, 
        },
    });
}


export const hashtagServices = {
    getHashtagByID,
    getAllHashtags,
    getAllHashtagsFromTask,
    getAllTasksFromHashtag,
    createHashtag,
    deleteHashtag,
    addHashtagToTask,
    removeHashtagFromTask,
}