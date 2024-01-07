-- CreateTable
CREATE TABLE "Pin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);
