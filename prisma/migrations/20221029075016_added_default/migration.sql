/*
  Warnings:

  - A unique constraint covering the columns `[staffID]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `avatar` VARCHAR(191) NULL DEFAULT '/avatar/avatar.png';

-- CreateIndex
CREATE UNIQUE INDEX `Staff_staffID_key` ON `Staff`(`staffID`);
