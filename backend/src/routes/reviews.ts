import express from "express";
import { reviewController } from "../controllers/reviews";
import { validate } from "../middleware/validation/validate";
import { ReviewSchema, ReviewUpdateSchema } from "../middleware/validation/schemas/reviews";
import { auth } from "../middleware/authentication/auth";
const router = express.Router();

// REVIEW GET all reviews ENDPOINT
router.get("/", reviewController.getAllReviews);

// REVIEW GET average rating for a user ENDPOINT
router.get("/rating/:userId", reviewController.getUserRating);

// REVIEW GET all reviews user has made ENDPOINT
router.get("/published/:userId", reviewController.getReviewsMadeByUser);

// REVIEW GET all reviews user has been given ENDPOINT
router.get("/received/:userId", reviewController.getReviewsGivenToUser);

// REVIEW GET review by id ENDPOINT
router.get("/:reviewId", reviewController.getReviewById);

// REVIEW POST create review ENDPOINT
router.post(
    "/:assigneeId",
    auth.withAuth,
    validate(ReviewSchema),
    reviewController.createReview
);

// REVIEW PUT edit review ENDPOINT
router.patch(
    "/:reviewId",
    auth.withAuth,
    validate(ReviewUpdateSchema),
    reviewController.updateReview
);

// REVIEW DELETE review ENDPOINT
router.delete("/:reviewId", auth.withAuth, reviewController.deleteReview);

export default router;
