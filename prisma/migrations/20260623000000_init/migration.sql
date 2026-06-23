-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Journal_slug_key" ON "Journal"("slug");

-- CreateTable
CREATE TABLE "Novel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT'
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "novelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    CONSTRAINT "Chapter_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "albumId" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Photo_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'Britha',
    "heroText" TEXT NOT NULL DEFAULT 'a personal digital universe',
    "featuredJournalId" TEXT,
    "featuredNovelId" TEXT,
    "featuredPhotoId" TEXT
);
