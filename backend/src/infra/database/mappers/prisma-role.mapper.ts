import { Prisma, Role as PrismaRole } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Role } from 'src/domains/iam/enterprise/entities/role.entity'

export class PrismaRoleMapper {
  static toDomain(raw: PrismaRole): Role {
    return Role.create(
      {
        name: raw.name,
        description: raw.description,
        tenantId: raw.tenantId ? new UniqueEntityID(raw.tenantId) : undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(role: Role): Prisma.RoleUncheckedCreateInput {
    return {
      id: role.id.toString(),
      name: role.name,
      description: role.description,
      tenantId: role.tenantId ? role.tenantId.toString() : undefined,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      deletedAt: role.deletedAt,
    }
  }
}
