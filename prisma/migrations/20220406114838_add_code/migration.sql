/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(255)`.
  - You are about to alter the column `avatar` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(255)`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "avatar" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "code" VARCHAR(16) NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Code_email_key" ON "Code"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Code_code_key" ON "Code"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
