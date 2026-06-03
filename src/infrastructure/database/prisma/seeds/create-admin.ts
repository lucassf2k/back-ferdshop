import { prisma } from '..';
import { UserRole } from '../../../../domain/enums/user-role';
import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import { ZodValidationService } from '../../../services/zod-validation-service';

async function createCategoriesSeeds() {
  const user = User.create({
    email: new Email('admin@mail.com', new ZodValidationService()),
    password: PBKDF2Password.create('12345678'),
    role: UserRole.ADMIN,
    name: 'Admin',
  });

  await prisma.user.create({
    data: {
      email: user.props.email.value,
      name: user.props.name,
      passwordValue: user.props.password.value,
      passwordSalt: user.props.password.salt,
      passwordAlgorithm: user.props.password.algorithm,
      role: user.props.role,
      id: user._id,
    },
  });
}

try {
  await createCategoriesSeeds();
} catch (error) {
  console.log(error);
} finally {
  await prisma.$disconnect();
}
