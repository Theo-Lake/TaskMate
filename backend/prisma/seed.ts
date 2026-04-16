import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import bcrypt from "bcrypt";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });

// Meets UserSchema validation: uppercase, lowercase, number, special char, 8-20 chars
const testPassword = await bcrypt.hash("Test@1234", 10);

async function seed() {
    // Clear in safe order (respect foreign key constraints)
    await prisma.reviews.deleteMany();
    await prisma.taskAssignment.deleteMany();
    await prisma.eventAssignment.deleteMany();
    await prisma.task.deleteMany(); // cascades conversations & messages
    await prisma.event.deleteMany();
    await prisma.hashtags.deleteMany();
    await prisma.user.deleteMany();

    // USERS
    await prisma.user.createMany({
        data: [
            {
                userID: 123456,
                firstName: "Trevor",
                lastName: "Tester",
                email: "trevor@test.com",
                occupation: "Student",
                password_hash: testPassword,
                universityID: 1001,
                username: "TrevorTester",
            },
            {
                userID: 2345678,
                firstName: "Alice",
                lastName: "Applicant",
                email: "alice@test.com",
                occupation: "Student",
                password_hash: testPassword,
                universityID: 1002,
                username: "AliceApplicant",
            },
            {
                userID: 345678,
                firstName: "Bob",
                lastName: "Builder",
                email: "bob@test.com",
                occupation: "Part-time Worker",
                password_hash: testPassword,
                universityID: 1003,
                username: "BobBuilder",
            },
        ],
    });

    // HASHTAGS
    await prisma.hashtags.createMany({
        data: [
            { hashtagID: 12345678, name: "Quick and Easy" },
            { hashtagID: 2345678, name: "Students Only" },
            { hashtagID: 345678, name: "Paid" },
            { hashtagID: 45678, name: "Remote" },
        ],
    });

    // TASKS  (use create not createMany so hashtag connect works)

    // Trevor's delivery task — 1 applicant pending, 1 rejected
    await prisma.task.create({
        data: {
            taskID: 12345678,
            name: "Grocery Delivery",
            description:
                "Delivering groceries from Tesco to my flat on campus. One bag, won't take long.",
            location: "Lancaster University",
            peopleRequired: 1,
            payment: 15.0,
            dueDate: new Date(2026, 5, 1),
            type: "delivery",
            publisherID: 123456,
            hashtags: {
                connect: [{ hashtagID: 12345678 }, { hashtagID: 345678 }],
            },
        },
    });

    // Trevor's tutoring task — Alice accepted
    await prisma.task.create({
        data: {
            taskID: 2345678,
            name: "Maths Tutoring",
            description:
                "Need help with calculus and statistics for my second year exams. Weekly sessions preferred.",
            location: "Library Study Room 3",
            peopleRequired: 1,
            payment: 25.0,
            dueDate: new Date(2026, 4, 20),
            type: "tutoring",
            publisherID: 123456,
            hashtags: {
                connect: [{ hashtagID: 2345678 }, { hashtagID: 345678 }],
            },
        },
    });

    // Alice's moving task — needs 3 people, Trevor pending, Bob accepted
    await prisma.task.create({
        data: {
            taskID: 3456789,
            name: "Help Me Move Flat",
            description:
                "Moving boxes from Alexandra Square to Bowland College. Plenty of boxes but nothing too heavy.",
            location: "Alexandra Square, Lancaster University",
            peopleRequired: 3,
            payment: 40.0,
            dueDate: new Date(2026, 6, 15),
            type: "moving",
            publisherID: 2345678,
            hashtags: { connect: [{ hashtagID: 12345678 }] },
        },
    });

    // Bob's tech support task — no applicants yet
    await prisma.task.create({
        data: {
            taskID: 4567890,
            name: "Fix My Laptop",
            description:
                "Laptop keeps freezing on startup. Need someone to diagnose and fix it, preferably same day.",
            location: "Remote or on campus",
            peopleRequired: 1,
            payment: 30.0,
            dueDate: new Date(2026, 4, 30),
            type: "tech_support",
            publisherID: 345678,
            hashtags: {
                connect: [{ hashtagID: 345678 }, { hashtagID: 45678 }],
            },
        },
    });

    // REVIEWS
    await prisma.reviews.createMany({
        data: [
            {
                name: "Great tutor, very patient",
                comment:
                    "Alice explained everything clearly and helped me pass my exam. Would hire again.",
                rating: "FIVE",
                reviewPublisherID: 123456,
                reviewAssigneeID: 2345678,
            },
            {
                name: "Clear instructions, easy job",
                comment:
                    "Trevor was upfront about what he needed. Smooth experience overall.",
                rating: "FOUR",
                reviewPublisherID: 2345678,
                reviewAssigneeID: 123456,
            },
        ],
    });
}

seed().then(() => prisma.$disconnect());
