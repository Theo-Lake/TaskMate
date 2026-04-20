/*
  Warnings:

  - You are about to drop the column `cardNumber` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `cvv` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `payerID` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverID` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskID` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ESCROW', 'RELEASE', 'REFUND');

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "cardNumber",
DROP COLUMN "cvv",
DROP COLUMN "expiryDate",
ADD COLUMN     "payerID" INTEGER NOT NULL,
ADD COLUMN     "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "receiverID" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "taskID" INTEGER NOT NULL,
ADD COLUMN     "transactionType" "TransactionType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_payerID_fkey" FOREIGN KEY ("payerID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_receiverID_fkey" FOREIGN KEY ("receiverID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("taskID") ON DELETE RESTRICT ON UPDATE CASCADE;
