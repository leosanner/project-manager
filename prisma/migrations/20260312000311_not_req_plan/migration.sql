-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_planId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "planId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
