-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_taskCID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationID_fkey";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_taskCID_fkey" FOREIGN KEY ("taskCID") REFERENCES "Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationID_fkey" FOREIGN KEY ("conversationID") REFERENCES "Conversation"("conversationID") ON DELETE CASCADE ON UPDATE CASCADE;
