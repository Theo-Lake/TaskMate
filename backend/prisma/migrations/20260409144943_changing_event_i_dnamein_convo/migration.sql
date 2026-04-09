/*
  Warnings:

  - You are about to drop the column `eventEventID` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_eventEventID_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "eventEventID",
ADD COLUMN     "eventID" INTEGER;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("eventID") ON DELETE SET NULL ON UPDATE CASCADE;
