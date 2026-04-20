import express from "express";
const router = express.Router();
// Importing route modules so that they can be exported as a whole

import conversationRoutes from "./conversations";
router.use("/conversations", conversationRoutes);

import taskRoutes from "./tasks";
router.use("/tasks", taskRoutes);

import userRoutes from "./users";
router.use("/users", userRoutes);

import reviewRoutes from "./reviews";
router.use("/reviews", reviewRoutes);

import hashtagRoutes from "./hashtags";
router.use("/hashtags", hashtagRoutes);

import eventRoutes from "./events";
router.use("/events", eventRoutes);

import authRoutes from "./auth";
router.use("/auth", authRoutes);

import paymentRoutes from "./payments";
router.use("/transaction", paymentRoutes)

export default router;

// Import route modules here
// import userRoutes from "./userRoutes.js";
// router.use("/users", userRoutes);

/* 
Creates Endpoints:

Register, Login
get profile, update profile
CRUD job
CRUD hashtag
(controllers manage the actual CRUD though)
*/

// router.get("/users", async (_,res) => {
//     const users = await prisma.user.findMany({
//                 // where: {
//         //     OR: [
//         //         {occupation: "Tester", universityID: {gt: 3}},       Just to show how prisma queries work.
//         //         {occupation: "Student"}
//         //     ]
//         //    AND: [{occupation: {not: "tester"} },{}]
//         //   occupation: {in: ["tester","student"]} (to search for types of occupation without having to check for different individual occupations )
//         // }
//     });
//     res.json(users)
// })
