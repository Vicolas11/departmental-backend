/*
  Warnings:

  - The values [ND1,NC2] on the enum `Student_level` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `level` ENUM('100', '200', '300', '400', '500') NULL;
