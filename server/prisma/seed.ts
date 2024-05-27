/* eslint-disable prettier/prettier */
// prisma/seed.ts
// import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
import { countries, airlines, flights } from './data/data';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // read json file, check if file exists

  for (const country of countries) {
    const { name, country_code } = country;

    await prisma.location.create({
      data: {
        name,
        code: country_code,
      },
    });
  }
  console.log('Added Location data');

  for (const airline of airlines) {
    const { name, img } = airline;

    await prisma.airline.create({
      data: {
        name,
        img,
      },
    });
  }
  console.log('Added Airlines data');
  for (const flight of flights) {
    await prisma.flight.create({
      data: {
        ...flight,
      },
    });
  }
  console.log('Added flights data');

  // create default admin user
  //   const { first_name, last_name, username, email, password } = user;
  //   //   Hashing the password to ensure security
  //   const salt = 10;
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const adminRole = await prisma.role.findUnique({
  //     where: { name: 'Admin' },
  //   });

  //   await prisma.user.create({
  //     data: {
  //       first_name,
  //       last_name,
  //       username,
  //       email,
  //       password: hashedPassword,
  //       roleId: adminRole.id,
  //     },
  //   });

  //   console.log('Added admin user');
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
