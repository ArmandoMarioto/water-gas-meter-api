/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Measure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_imageId_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Measure";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "measureDatetime" TIMESTAMP(3) NOT NULL,
    "measureType" TEXT NOT NULL,
    "measureValue" DOUBLE PRECISION NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "imageId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_fileName_key" ON "images"("fileName");

-- CreateIndex
CREATE UNIQUE INDEX "images_url_key" ON "images"("url");

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
