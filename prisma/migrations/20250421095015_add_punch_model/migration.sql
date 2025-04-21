-- CreateTable
CREATE TABLE "Punch" (
    "id" SERIAL NOT NULL,
    "punchInTime" TIMESTAMP(3) NOT NULL,
    "punchOutTime" TIMESTAMP(3),
    "location" TEXT,
    "comment" TEXT,
    "latitude" FLOAT,
    "longitude" FLOAT,
    
    CONSTRAINT "Punch_pkey" PRIMARY KEY ("id")
);
