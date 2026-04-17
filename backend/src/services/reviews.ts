import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";
import { Rating } from "../generated/prisma/enums";

export async function getAllReviews() {
    return await db.reviews.findMany({
        orderBy: {
            created_at: "desc",
        },
    });
}

export async function getReviewsMadeByUser(userID: Number) {
    return await db.reviews.findMany({
        where: { reviewPublisherID: Number(userID) },
        select: {
            reviewID: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
}

export async function getReviewsGivenToUser(userID: Number) {
    return await db.reviews.findMany({
        where: { reviewAssigneeID: Number(userID) },
        select: {
            reviewID: true,
            name: true,
            comment: true,
            rating: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
}

export async function getReviewById(reviewID: Number) {
    return await db.reviews.findUnique({
        where: { reviewID: Number(reviewID) },
    });
}

export async function createReview(
    publisherID: Number,
    assigneeID: Number,
    body: JsonObject
) {
    const { name, comment, rating } = body;

    if (!rating) {
        throw new Error("Rating is missing");
    }

    return await db.reviews.create({
        data: {
            name: name as string,
            comment: comment as string,
            rating: rating as Rating,
            reviewPublisherID: publisherID as number,
            reviewAssigneeID: assigneeID as number,
        },
        include: {
            reviewPublisher: {
                select: {
                    userID: true,
                    username: true,
                    profilePicture: true,
                },
            },
            reviewAssignee: {
                select: {
                    userID: true,
                    username: true,
                    profilePicture: true,
                },
            },
        },
    });
}

export async function updateReview(reviewID: Number, body: JsonObject) {
    let { name, comment, rating } = body;

    return await db.reviews.update({
        where: { reviewID: Number(reviewID) },
        data: {
            name: name as string | undefined,
            comment: comment as string | undefined,
            rating: rating as Rating | undefined,
        },
    });
}

export async function deleteReview(reviewID: Number) {
    return await db.reviews.delete({
        where: { reviewID: Number(reviewID) },
    });
}

const ratingToNumber: Record<Rating, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
};

export async function getUserAverageRating(
    userID: Number
): Promise<number | null> {
    const reviews = await db.reviews.findMany({
        where: { reviewAssigneeID: Number(userID) },
        select: { rating: true },
    });

    if (reviews.length === 0) return null;

    const sum = reviews.reduce((acc, r) => acc + ratingToNumber[r.rating], 0);
    return sum / reviews.length;
}

export const reviewServices = {
    getAllReviews,
    getReviewsMadeByUser,
    getReviewsGivenToUser,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getUserAverageRating,
};
