import { Request, Response } from "express";
import { reviewServices } from "../services/reviews";

async function getReviewsMadeByUser(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);
        const reviews = await reviewServices.getReviewsMadeByUser(userID);

        if (!reviews) {
            res.status(404).json({ error: "User or Reviews not found" });
            return;
        }

        console.log("Review GET made by user request accepted.");
        res.status(200).json(reviews);
    } catch (error) {
        console.log(
            `An error occured while trying to get reviews made by user: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function getReviewsGivenToUser(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);
        const reviews = await reviewServices.getReviewsGivenToUser(userID);

        if (!reviews) {
            res.status(404).json({ error: "User or Reviews not found" });
            return;
        }

        console.log("Review GET given to user request accepted.");
        res.status(200).json(reviews);
    } catch (error) {
        console.log(
            `An error occured while trying to get reviews given to user: ${error}`
        );
        // TODO Conversations sends as a string, but tasks doesn't, which is correct?
        res.status(500).json({ error: String(error) });
    }
}

async function getReviewById(req: Request, res: Response) {
    try {
        const reviewID = Number(req.params.reviewId);
        const review = await reviewServices.getReviewById(reviewID);

        if (!review) {
            res.status(404).json({ error: "Review not found" });
            return;
        }

        console.log("Review GET by ID request accepted.");
        res.status(200).json(review);
    } catch (error) {
        console.log(
            `An error occured while trying to get review by ID: ${error}`
        );
        res.status(500).json({ error: String(error) });
    }
}

async function createReview(req: Request, res: Response) {
    try {
        const userID = req.user!.userID;
        const assigneeID = Number(req.params.assigneeId);

        if (userID === assigneeID) {
            res.status(400).json({ error: "You cannot review yourself" });
            return;
        }

        const review = await reviewServices.createReview(
            userID,
            assigneeID,
            req.body
        );

        if (!review) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        console.log("Review CREATE request accepted.");
        res.status(201).json(review);
    } catch (error) {
        console.log(`An error occured while trying to create review: ${error}`);
        res.status(500).json({ error: String(error) });
    }
}

async function updateReview(req: Request, res: Response) {
    try {
        const reviewID = Number(req.params.reviewId);
        const review = await reviewServices.updateReview(reviewID, req.body);

        if (!review) {
            res.status(404).json({ error: "Review not found" });
            return;
        }

        console.log("Review UPDATE request accepted.");
        res.status(200).json(review);
    } catch (error) {
        console.log(`An error occured while trying to update review: ${error}`);
        res.status(500).json({ error: String(error) });
    }
}

async function deleteReview(req: Request, res: Response) {
    try {
        const reviewID = Number(req.params.reviewId);
        const review = await reviewServices.deleteReview(reviewID);

        if (!review) {
            res.status(404).json({ error: "Review not found" });
            return;
        }

        console.log("Review DELETE request accepted.");
        res.status(200).json(review);
    } catch (error) {
        console.log(`An error occured while trying to delete review: ${error}`);
        res.status(500).json({ error: String(error) });
    }
}

export const reviewController = {
    getReviewsMadeByUser,
    getReviewsGivenToUser,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
