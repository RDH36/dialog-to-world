/*
  Warnings:

  - Added the required column `language` to the `Dialog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dialog" ADD COLUMN     "language" TEXT NOT NULL;
