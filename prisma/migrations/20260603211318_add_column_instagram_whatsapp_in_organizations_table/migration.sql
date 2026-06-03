/*
  Warnings:

  - Added the required column `instagram` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
