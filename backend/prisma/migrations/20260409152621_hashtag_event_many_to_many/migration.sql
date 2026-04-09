/*
  Warnings:

  - You are about to drop the column `eventEventID` on the `Hashtags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hashtags" DROP CONSTRAINT "Hashtags_eventEventID_fkey";

-- AlterTable
ALTER TABLE "Hashtags" DROP COLUMN "eventEventID";

-- CreateTable
CREATE TABLE "_EventToHashtags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventToHashtags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToHashtags_B_index" ON "_EventToHashtags"("B");

-- AddForeignKey
ALTER TABLE "_EventToHashtags" ADD CONSTRAINT "_EventToHashtags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("eventID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToHashtags" ADD CONSTRAINT "_EventToHashtags_B_fkey" FOREIGN KEY ("B") REFERENCES "Hashtags"("hashtagID") ON DELETE CASCADE ON UPDATE CASCADE;
