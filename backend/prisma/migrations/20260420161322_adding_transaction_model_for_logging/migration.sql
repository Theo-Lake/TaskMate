-- CreateTable
CREATE TABLE "Transactions" (
    "transactionID" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transactionID")
);
