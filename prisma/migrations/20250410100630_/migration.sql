/*
  Warnings:

  - A unique constraint covering the columns `[userId,title,challengeId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Response_userId_title_challengeId_key" ON "Response"("userId", "title", "challengeId");
