/*
  Warnings:

  - A unique constraint covering the columns `[plantype]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "planId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_plantype_key" ON "Plan"("plantype");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
