-- CreateEnum
CREATE TYPE "Status" AS ENUM ('complete', 'pedning', 'in_Progress', 'not_Complete', 'cancelled');

-- CreateEnum
CREATE TYPE "JobTypes" AS ENUM ('tutoring', 'delivery', 'freelance', 'moving', 'tech_support', 'general', 'other');

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "universityID" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Job" (
    "jobID" SERIAL NOT NULL,
    "publisherID" INTEGER NOT NULL,
    "type" "JobTypes" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'not_Complete',
    "payment" DECIMAL(65,30) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "DueDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobID")
);

-- CreateTable
CREATE TABLE "JobAssignment" (
    "assignmentID" SERIAL NOT NULL,
    "jobID" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobAssignment_pkey" PRIMARY KEY ("assignmentID")
);

-- CreateTable
CREATE TABLE "Hashtags" (
    "hashtagID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hashtags_pkey" PRIMARY KEY ("hashtagID")
);

-- CreateTable
CREATE TABLE "_HashtagsToJob" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_HashtagsToJob_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_universityID_key" ON "User"("universityID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtags_name_key" ON "Hashtags"("name");

-- CreateIndex
CREATE INDEX "_HashtagsToJob_B_index" ON "_HashtagsToJob"("B");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_publisherID_fkey" FOREIGN KEY ("publisherID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAssignment" ADD CONSTRAINT "JobAssignment_jobID_fkey" FOREIGN KEY ("jobID") REFERENCES "Job"("jobID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAssignment" ADD CONSTRAINT "JobAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagsToJob" ADD CONSTRAINT "_HashtagsToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtags"("hashtagID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagsToJob" ADD CONSTRAINT "_HashtagsToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job"("jobID") ON DELETE CASCADE ON UPDATE CASCADE;
