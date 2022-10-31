/*
  Warnings:

  - Added the required column `title` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `staff` ADD COLUMN `title` ENUM('Professor', 'Doctor', 'Mr', 'Mrs', 'Miss') NOT NULL;
