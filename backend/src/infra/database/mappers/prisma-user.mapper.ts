import { Prisma, User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domains/iam/enterprise/entities/user.entity'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        fullName: raw.fullName,
        email: raw.email,
        password: raw.password,
        active: raw.active,
        tenantId: raw.tenantId ? new UniqueEntityID(raw.tenantId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      active: user.active,
      tenantId: user.tenantId?.toString(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }
  }
}
