/*
  Warnings:

  - The `images` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `images` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];
