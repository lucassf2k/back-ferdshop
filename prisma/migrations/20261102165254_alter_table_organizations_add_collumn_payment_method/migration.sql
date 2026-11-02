-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "payment_methods" "PaymentMethod"[] DEFAULT ARRAY[]::"PaymentMethod"[];
