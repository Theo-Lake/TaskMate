import express from "express";
import { reviewController } from "../controllers/reviews";
import { validate } from "../middleware/validation/validate";
import { ReviewSchema } from "../middleware/validation/schemas/reviews";
const router = express.Router();

// REVIEW GET all reviews user has made ENDPOINT
router.get("/published/:userId", reviewController.getReviewsMadeByUser);

// REVIEW GET all reviews user has been given ENDPOINT
router.get("/received/:userId", reviewController.getReviewsGivenToUser);

// REVIEW GET review by id ENDPOINT
router.get("/id/:reviewId", reviewController.getReviewById);

// REVIEW POST create review ENDPOINT
router.post("/:userId/create/:assigneeId", validate(ReviewSchema), reviewController.createReview);

// REVIEW PUT edit review ENDPOINT
router.put("/update/:reviewId", validate(ReviewSchema), reviewController.updateReview)

// REVIEW DELETE review ENDPOINT
router.delete("/delete/:reviewId", reviewController.deleteReview)

export default router;