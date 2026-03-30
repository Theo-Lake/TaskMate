import express from "express";
const router = express.Router();
import { reviewController } from "../controllers/reviews";


// REVIEW GET all reviews user has made ENDPOINT
router.get("/published/:userId", reviewController.getReviewsMadeByUser);

// REVIEW GET all reviews user has been given ENDPOINT
router.get("/received/:userId", reviewController.getReviewsGivenToUser);

// REVIEW GET review by id ENDPOINT
router.get("/id/:reviewId", reviewController.getReviewById);

// REVIEW POST create review ENDPOINT
router.post("/create/:userId/:assigneeId", reviewController.createReview);

// REVIEW PUT edit review ENDPOINT
router.put("/update/:reviewId", reviewController.updateReview)

// REVIEW DELETE review ENDPOINT
router.delete("/delete/:reviewId", reviewController.deleteReview)

export default router;