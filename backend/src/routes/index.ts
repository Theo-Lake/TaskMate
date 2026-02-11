import express from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
export const prisma = new PrismaClient({ adapter });

const router = express.Router();

router.get("/users", async (_,res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

// Import route modules here
// import userRoutes from "./userRoutes.js";
// router.use("/users", userRoutes);

export default router;


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