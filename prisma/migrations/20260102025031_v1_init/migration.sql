-- CreateTable
CREATE TABLE "EncryptionEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "operation" TEXT NOT NULL,
    "details" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
