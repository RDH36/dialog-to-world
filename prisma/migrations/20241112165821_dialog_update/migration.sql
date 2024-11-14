/*
  Warnings:

  - You are about to drop the column `iAModel` on the `Dialog` table. All the data in the column will be lost.
  - Added the required column `level` to the `Dialog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vocabulary` to the `Dialog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- AlterTable
ALTER TABLE "Dialog" DROP COLUMN "iAModel",
ADD COLUMN     "level" "Level" NOT NULL,
ADD COLUMN     "vocabulary" TEXT NOT NULL;
