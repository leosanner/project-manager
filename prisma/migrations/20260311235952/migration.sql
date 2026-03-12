/*
  Warnings:

  - A unique constraint covering the columns `[plantype]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plan_plantype_key" ON "Plan"("plantype");
