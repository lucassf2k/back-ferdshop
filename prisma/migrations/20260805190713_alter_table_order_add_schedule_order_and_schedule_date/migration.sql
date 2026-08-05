-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "schedule_date" TIMESTAMP(3),
ADD COLUMN     "schedule_order" BOOLEAN NOT NULL DEFAULT false;
