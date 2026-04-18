import client from "./client";

export async function getAllReviews() {
    const res = await client.get("/reviews");
    return res.data;
}

export async function getUserRating(userId: number) {
    const res = await client.get(`/reviews/rating/${userId}`);
    return res.data;
}

export async function getReviewsMadeByUser(userId: number) {
    const res = await client.get(`/reviews/published/${userId}`);
    return res.data;
}

export async function getReviewsGivenToUser(userId: number) {
    const res = await client.get(`/reviews/received/${userId}`);
    return res.data;
}

export async function getReviewById(reviewId: number) {
    const res = await client.get(`/reviews/${reviewId}`);
    return res.data;
}

export async function createReview(assigneeId: number, data: unknown) {
    const res = await client.post(`/reviews/${assigneeId}`, data);
    return res.data;
}

export async function updateReview(reviewId: number, data: unknown) {
    const res = await client.patch(`/reviews/${reviewId}`, data);
    return res.data;
}

export async function deleteReview(reviewId: number) {
    const res = await client.delete(`/reviews/${reviewId}`);
    return res.data;
}
