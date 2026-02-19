-- CreateTable
CREATE TABLE "Conversation" (
    "conversationID" SERIAL NOT NULL,
    "taskCID" INTEGER NOT NULL,
    "user1ID" INTEGER NOT NULL,
    "user2ID" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversationID")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageID" SERIAL NOT NULL,
    "conversationID" INTEGER NOT NULL,
    "senderID" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageID")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_taskCID_fkey" FOREIGN KEY ("taskCID") REFERENCES "Task"("taskID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_user1ID_fkey" FOREIGN KEY ("user1ID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_user2ID_fkey" FOREIGN KEY ("user2ID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationID_fkey" FOREIGN KEY ("conversationID") REFERENCES "Conversation"("conversationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
