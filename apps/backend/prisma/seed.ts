import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
];

function getRandomDate(start: Date, end: Date): Date {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

function getRandomAmount(): number {
    const min = 10000;
    const max = 200000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
    await prisma.sale.deleteMany();

    const data = Array.from({ length: 100 }, () => ({
        productName: products[Math.floor(Math.random() * products.length)],
        amount: getRandomAmount(),
        date: getRandomDate(new Date("2025-01-01"), new Date("2025-03-31")),
    }));

    await prisma.sale.createMany({ data });

    console.log("Finish Seed Data");
}

main()
    .catch((e) => {
        console.error("Error seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
