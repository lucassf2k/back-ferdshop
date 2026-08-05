/*
  Warnings:

  - Added the required column `customer_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_option` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `online_payment_method` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryOption" AS ENUM ('DELIVERY', 'PICKUP');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'ONLINE');

-- CreateEnum
CREATE TYPE "OnlinePaymentMethod" AS ENUM ('PIX');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "address_number" TEXT,
ADD COLUMN     "change_for" DECIMAL(10,2),
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "delivery_option" "DeliveryOption" NOT NULL,
ADD COLUMN     "need_change" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "online_payment_method" "OnlinePaymentMethod" NOT NULL,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "send_whatsapp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "without_address_number" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "delivery_address" DROP NOT NULL;
