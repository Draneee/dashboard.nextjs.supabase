import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randBetweenDate, randNumber, randProduct } from "@ngneat/falso";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createClients() {
    const fakeProducts = randProduct({
        length: 300,
    });
    for (let index = 0; index < fakeProducts.length; index++) {
        const name = faker.commerce.productName();
        await prisma.product.create({
            data: {
                name: name,
                price: faker.commerce.price(),
            }
        });
    }
    console.log(`Database has been seeded. 🌱`);

    // for (let i = 5; i <= 20; i++) {
    //     const clientName = `Cliente ${i}`;

    //     await prisma.client.create({
    //         data: {
    //             name: clientName,
    //         },
    //     });

    //     console.log(`Cliente creado: ${clientName}`);
    // }

    await prisma.$disconnect();
}

createClients()


// const main = async () => {
//     try {
//         await prisma.product.deleteMany();
//         const productName = faker.commerce.product()
//         await prisma.product.deleteMany();
//         const fakeProducts = randProduct({
//             length: 300,
//         });

//         for (let index = 0; index < fakeProducts.length; index++) {
//             const name = faker.commerce.productName();
//             await prisma.product.create({
//                 name: name,
//                 price: faker.commerce.price(),
//             });
//         }
//         console.log(`Database has been seeded. 🌱`);
//     }
//     catch (error) {
//         throw error;
//     }
// }

// main().catch((err) => {
//     console.warn("Error While generating Seed: \n", err);
// });
