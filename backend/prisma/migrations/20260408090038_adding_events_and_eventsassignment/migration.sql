-- CreateEnum
CREATE TYPE "EventTypes" AS ENUM ('social', 'sport', 'academic', 'career', 'cultural', 'volunteering', 'other');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "eventEventID" INTEGER;

-- AlterTable
ALTER TABLE "Hashtags" ADD COLUMN     "eventEventID" INTEGER;

-- CreateTable
CREATE TABLE "Event" (
    "eventID" SERIAL NOT NULL,
    "publisherID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventTypes" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'not_Complete',
    "location" TEXT NOT NULL,
    "peopleRequired" INTEGER NOT NULL,
    "completedDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "EventAssignment" (
    "eventAssignmentID" SERIAL NOT NULL,
    "eventID" INTEGER NOT NULL,
    "assigneeID" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "EventAssignment_pkey" PRIMARY KEY ("eventAssignmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventID_publisherID_key" ON "Event"("eventID", "publisherID");

-- CreateIndex
CREATE UNIQUE INDEX "EventAssignment_eventAssignmentID_assigneeID_key" ON "EventAssignment"("eventAssignmentID", "assigneeID");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publisherID_fkey" FOREIGN KEY ("publisherID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssignment" ADD CONSTRAINT "EventAssignment_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("eventID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssignment" ADD CONSTRAINT "EventAssignment_assigneeID_fkey" FOREIGN KEY ("assigneeID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hashtags" ADD CONSTRAINT "Hashtags_eventEventID_fkey" FOREIGN KEY ("eventEventID") REFERENCES "Event"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_eventEventID_fkey" FOREIGN KEY ("eventEventID") REFERENCES "Event"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;
