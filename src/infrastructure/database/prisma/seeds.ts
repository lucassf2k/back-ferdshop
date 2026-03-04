import { prisma } from '.';
import { getUUIDV7 } from '../../services/id-services';

async function createCategoriesSeeds() {
  await prisma.category.createMany({
    data: [
      {
        id: getUUIDV7(),
        name: 'Água',
      },
    ],
  });
}

try {
  await createCategoriesSeeds();
} catch (error) {
  console.log(error);
} finally {
  await prisma.$disconnect();
}
