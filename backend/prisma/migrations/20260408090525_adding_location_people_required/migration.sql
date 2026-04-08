/*
  Warnings:

  - Added the required column `location` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleRequired` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "peopleRequired" INTEGER NOT NULL;
