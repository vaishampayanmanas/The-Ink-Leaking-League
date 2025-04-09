/*
  Warnings:

  - You are about to drop the `ChallengeParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChallengeParticipant" DROP CONSTRAINT "ChallengeParticipant_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipant" DROP CONSTRAINT "ChallengeParticipant_userId_fkey";

-- DropTable
DROP TABLE "ChallengeParticipant";

-- CreateTable
CREATE TABLE "_ChallengeParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChallengeParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChallengeParticipants_B_index" ON "_ChallengeParticipants"("B");

-- AddForeignKey
ALTER TABLE "_ChallengeParticipants" ADD CONSTRAINT "_ChallengeParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengeParticipants" ADD CONSTRAINT "_ChallengeParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
