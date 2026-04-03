/*
  Warnings:

  - The primary key for the `EmailVerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmailVerificationToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailVerificationToken" DROP CONSTRAINT "EmailVerificationToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "emailTokenID" SERIAL NOT NULL,
ADD CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("emailTokenID");

-- CreateTable
CREATE TABLE "RefreshToken" (
    "refreshTokenID" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("refreshTokenID")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
