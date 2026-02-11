import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import bcrypt from 'bcrypt';


const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
export const prisma = new PrismaClient({ adapter });

/* 
This command above is used so that prisma knows how to communicate with the DB
it creates a connection adapter instance, taking the URL as a config so it can
talk to postgreSQL, this adapter is then passed to the prisma client so that it
knows what connection method to use. PrismaClient is to create an instance to connect
to the DB.
*/ 

const testPassword = await bcrypt.hash("testynesty123",10);

async function seed(){
    // Clear existing data (order matters due to foreign keys)
    await prisma.user.deleteMany();
    await prisma.taskAssignment.deleteMany();
    await prisma.hashtags.deleteMany();
    await prisma.task.deleteMany();

    await prisma.user.createMany({
        data: [
             {
            userID: 1,
            firstName: "Trevor", 
            lastName: "Tester",
            email: "testemail@gmail.com", 
            occupation: "Tester", 
            password_hash: testPassword, 
            universityID: 1234, 
            username: "TrevorTheTester"
        },
        {
            userID: 2,
            firstName: "Johnny", 
            lastName: "Testing",
            email: "jonnytesting@gmail.com", 
            occupation: "Tester", 
            password_hash: testPassword, 
            universityID: 12345, 
            username: "JohnnyTheTester"
        }
        ],
    });
         await prisma.hashtags.createMany({
        data: [
             {
                hashtagID: 1,
                name: "Quick and Easy"
        }
        ],
        
    });
    await prisma.task.create({ //create only creates a single object at a time, but handles connections (hashtag), createMany does not handle connections, but allows for a list of objects.
        data:
             {
            taskID: 1,
            name: "Delivery",
            description: "Delivering groceries",
            payment: 20.0,
            dueDate: new Date(2026, 1, 11), // month is indexed, 0 = jan ...
            type: 'delivery',
            publisherID: 1,
            hashtags: {
                connect: [{hashtagID: 1}]
            }
        },
    });
    await prisma.taskAssignment.createMany({
        data: [
             {
                taskID: 1,
                assigneeID: 2
        }
        ],
        
    });
    //TODO create more seed test data here.
    //TODO create trigger constraints, that do not allow due dates to be made in dates that already passed
}   // also make it so publisherID can only accept valid, existing publishers, or it cascade deletes.

// IDS SHOULD NOT BE DECLARED, they are MANAGED BY the DBMS but, in this test data, it is.

// The seed is the inital data that will always be here when the db initializes, or resets.
// It is used to have some data so the database can function. In this case it is test data.

seed().then(() => prisma.$disconnect()); 
//used to prevent data leaks due to not closing connection.