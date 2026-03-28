import express from "express";
const router = express.Router();
import { reviewController } from "../controllers/reviews";


// REVIEW GET all reviews user has made ENDPOINT
router.get("/:userId", reviewController.getReviewsMadeByUser);

// REVIEW GET all reviews user has been given ENDPOINT
router.get("/:userId", reviewController.getReviewsGivenToUser);

// REVIEW GET review by id ENDPOINT
router.get("/:reviewID", reviewController.getReviewById);

// REVIEW POST create review ENDPOINT
router.post("/:userId/create/:assigneeId", reviewController.createReview);

// REVIEW PUT edit review ENDPOINT
router.put("/:reviewId", reviewController.updateReview)

// REVIEW DELETE review ENDPOINT
router.delete("/:reviewId", reviewController.deleteReview)

export default router;