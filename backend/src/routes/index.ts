import express from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
export const prisma = new PrismaClient({ adapter });

const router = express.Router();

//TODO ALL REQUESTS NEED TO BE VALIDATED SO INJECTIONS CAN'T OCCUR. DO NOT USE CORS.

// USER DATA GET ENDPOINT
router.get("/users", async (req,res) => {
    try {
      //TODO Use req to check for validation (so it isnt weak to SQL injections)
      const users = await prisma.user.findMany();
      console.log("Users get accepted.")
      res.status(200).json({users: users});
    } catch (error) {
      console.log(`An error occured while trying to get User data: ${error}`);
      res.status(500).json({error: {error}})
    }
})

// USER DATA POST ENDPOINT
router.post("/users", async (req,res) => {
  try{
    const {/*TODO put here the data that is being posted */ } = req.body;
 
    //prisma.user.create() input data into db.

    console.log("User data post accepted.")
    res.status(200).json({Message: "User data successfully posted"})

  } catch(error){
    console.log("An error occured while posting the user data");
    res.status(500).json({error: error});
  }
});

// USER DATA PUT ENDPOINT

router.put("/users", async (req,res) => {
  //TODO finish put
});

// CONVERSATION GET ENDPOINT
router.get("/conversations", async (req,res) => {
  try{
    const { taskID } = req.body; //Getting taskID

    const conversation = await prisma.conversation.findMany({
      where: {
        taskCID: taskID
      }
    });

    console.log("Conversation request accepted.");
    res.status(200).json(conversation);
  } catch(error){
    console.log(`An error occured while trying to get conversation: ${error}`);
    res.status(500).json({error: error});
  }
});

// MESSAGES GET ENDPOINT

router.get("/conversation/messages", async (req,res) => {
  try{
    const { cID } = req.body; //destructuring conversation id

    const messages = await prisma.message.findMany({
      where: {
        conversationID: cID
      }
    });

    console.log("Messages request accepted.");
    res.status(200).json(messages);

  } catch(error){
    console.log(`An error occured while trying to get messages: ${error}`)
    res.status(500).json({error: error});
  }
});


// MESSAGES POST
router.post("/conversation/messages", async (req,res) => {
  //messages post
});

// TASK POST (no need for conversation post since if a task is created so is a convo)
router.post("/tasks", (req,res) => {
  //TODO tasks post
});

// TASK PUT
router.put("/tasks", (req,res) => {
  //TODO tasks put
});

// TASK GET
router.get("/tasks", (req,res) => {
  //TODO tasks get
});


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