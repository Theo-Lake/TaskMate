import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import bcrypt from 'bcrypt'
import { Has } from '../src/generated/prisma/internal/prismaNamespace';


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

const testPassword = await bcrypt.hash("testynesty123",10)

async function seed(){
    await prisma.user.createMany({
        data: [
             {
            firstName: "Trevor", 
            lastName: "Tester",
            email: "testemail@gmail.com", 
            occupation: "Tester", 
            password_hash: testPassword, 
            universityID: 1234, 
            username: "TrevorTheTester"
        }
        ],
        skipDuplicates: true
    });
    //TODO create more seed test data here.
}

// The seed is the inital data that will always be here when the db initializes, or resets.
// It is used to have some data so the database can function. In this case it is test data.

seed().then(() => prisma.$disconnect()); 
//used to prevent data leaks due to not closing connection.