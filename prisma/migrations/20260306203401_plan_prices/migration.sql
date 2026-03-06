-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PREMIUM', 'PRO');

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "markdownContent" SET DEFAULT 'Use this section to outline the feature scope, goals, and key implementation notes.';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "plantype" "PlanType" NOT NULL DEFAULT 'FREE',
    "maxProjects" INTEGER NOT NULL DEFAULT 5,
    "maxFeatures" INTEGER NOT NULL DEFAULT 15,
    "maxDocuments" INTEGER NOT NULL DEFAULT 5,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);
