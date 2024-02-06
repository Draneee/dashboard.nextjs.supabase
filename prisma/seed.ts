import { PrismaClient } from '@prisma/client';

import { randProduct } from "@ngneat/falso";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seedingFn() {
    console.log(`Starting Products Seeding...`)
    const fakeProducts = randProduct({
        length: 50,
    });
    for (let i = 0; i < fakeProducts.length; i++) {
        const productName = faker.commerce.productName();
        await prisma.product.create({
            data: {
                name: productName,
                price: faker.commerce.price(),
            }
        });
        console.log(`Product seeded: ${productName}`);

    }
    console.log(`Product Seeding Complete.`);

    console.log(`Starting Office Seeding...`)
    for (const officeData of branchOfficesData) {
        await prisma.branchOffice.create({ data: officeData });
        console.log(`Office seeded: ${officeData.name}`);
    }
    console.log(`Office Seeding Complete.`);


    console.log(`Starting Client Seeding...`)
    const fakeClients = randProduct({
        length: 50,
    });
    for (let i = 0; i <= fakeClients.length; i++) {
        const clientName = faker.person.fullName();

        await prisma.client.create({
            data: {
                name: clientName,
            },
        });

        console.log(`Client seeded: ${clientName}`);
    }

    await prisma.$disconnect();
}

seedingFn()

const branchOfficesData = [
    { name: "Colombia", currency: "COP" },
    { name: "Mexico", currency: "MXN" },
    { name: "Brazil", currency: "BRL" },
    { name: "Argentina", currency: "ARS" },
    { name: "Chile", currency: "CLP" },
    { name: "Peru", currency: "PEN" },
    { name: "Venezuela", currency: "VES" },
    { name: "Ecuador", currency: "USD" },
    { name: "Uruguay", currency: "UYU" },
    { name: "Paraguay", currency: "PYG" },
];